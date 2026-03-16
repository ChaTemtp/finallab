require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { Pool } = require('pg');

const app  = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

// API: ดึงโปรไฟล์ (ใช้ตาราง users ตาม Schema ล่าสุดของคุณ)
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email, role FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API: ดู Logs ของระบบ
app.get('/api/users/logs', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM logs ORDER BY created_at DESC LIMIT 100');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3003, () => console.log('User Service running on port 3003'));