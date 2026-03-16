const { Pool } = require('pg');

// ใช้ DATABASE_URL ตัวเดียวจบ เพราะเราตั้งค่าไว้ใน docker-compose แล้ว
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Postgres connection error:', err);
});

// สร้างฟังก์ชันชื่อ initDB ตามที่ index.js เรียกหา
const initDB = async () => {
  const client = await pool.connect();
  try {
    // ลอง query สั้นๆ เพื่อเช็กว่าติดต่อได้จริงไหม
    await client.query('SELECT NOW()');
    console.log('Database connection verified successfully');
  } finally {
    client.release();
  }
};

// ส่งออกแบบตัวเดียวเพียวๆ (Default Export) เพื่อให้ require('./db/db') ทำงานได้
module.exports = initDB;