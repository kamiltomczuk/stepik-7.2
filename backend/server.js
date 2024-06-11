const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'user',
  host: 'database',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});

app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
