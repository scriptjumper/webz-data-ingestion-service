import pool from './config/database';

async function testConnection() {
  const res = await pool.query('SELECT NOW()');
  console.log('DB Time:', res.rows[0]);
  process.exit();
}

testConnection();