const { Pool } = require('pg');

// ใช้ DATABASE_URL จาก environment ที่ตั้งไว้ใน docker-compose
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('[task-service] Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('[task-service] Postgres connection error:', err);
});

// ฟังก์ชันตรวจสอบการเชื่อมต่อ
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    console.log('[task-service] Database connection verified!');
  } finally {
    client.release();
  }
}

// ส่งออกแบบ Default เพื่อให้ index.js เรียกใช้ง่ายๆ
module.exports = initDB;