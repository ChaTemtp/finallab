const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('[user-service] Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('[user-service] Postgres connection error:', err);
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    console.log('[user-service] Database connection verified!');
  } finally {
    client.release();
  }
}

module.exports = initDB;