require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { Pool } = require('pg');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const app  = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ดึงค่า Config จาก Environment
const JWT_SECRET = process.env.JWT_SECRET || 'dev-shared-secret';
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- API: Register (สมัครสมาชิก) ---
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide username, email and password' });
    }

    try {
        // 1. Hash รหัสผ่าน
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 2. บันทึกลง Database
        const query = `
            INSERT INTO users (username, email, password_hash, role) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id, username, email, role, created_at
        `;
        const values = [username, email, passwordHash, role || 'user'];
        
        const result = await pool.query(query, values);
        const newUser = result.rows[0];

        // 3. สร้าง JWT Token ทันทีหลังสมัครเสร็จ
        const token = jwt.sign(
            { id: newUser.id, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user: newUser
        });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: 'Email or Username already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

// --- API: Login (เข้าสู่ระบบ) ---
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const user = result.rows[0];

        // ตรวจสอบรหัสผ่านที่ Hash ไว้
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // สร้าง JWT Token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login Success',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- API: ดึงรายชื่อ User ทั้งหมด (Admin Only) ---
app.get('/api/auth/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email, role, created_at FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));