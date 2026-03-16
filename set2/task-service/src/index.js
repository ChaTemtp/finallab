require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { Pool } = require('pg');

const app  = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

// API: ดึงงานทั้งหมด
app.get('/api/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API: เพิ่มงานใหม่ (ต้องระบุ status ให้ตรงกับ CHECK constraint: TODO, IN_PROGRESS, DONE)
app.post('/api/tasks', async (req, res) => {
    const { user_id, title, description, status, priority } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (user_id, title, description, status, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, title, description, status || 'TODO', priority || 'medium']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(3002, () => console.log('Task Service running on port 3002'));