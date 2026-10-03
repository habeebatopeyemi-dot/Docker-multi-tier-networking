const express = require('express');
const { Pool } = require('pg');

const app = express();

// Database connection using the container name 'db-app'
const pool = new Pool({
  host: 'db-app',
  user: 'postgres',
  password: 'secret',
  database: 'postgres',
  port: 5432,
});

app.get('/data', async (req, res) => {
  try {
    // Query the Postgres database
    const dbRes = await pool.query('SELECT NOW()');
    res.json({ 
      message: "Hello, welcome from backend!", 
      dbTime: dbRes.rows[0].now 
    });
  } catch (err) {
    res.json({ 
      message: "Backend reached, but DB connection failed", 
      error: err.message 
    });
  }
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Backend listening on port 5000');
});