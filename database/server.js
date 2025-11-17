require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = mysql.createPool({
  host: DB_HOST || 'localhost',
  port: DB_PORT || 3306,
  user: DB_USER || 'root',
  password: DB_PASSWORD,
  database: DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/prescriptions', async (req, res) => {
  try {
    // Assume one user for this prototype
    const [rows] = await pool.query(
      'SELECT * FROM prescriptions WHERE user_id = 1'
    );

    res.json(rows);

  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ message: 'Error fetching prescriptions'});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Press CTRL+C to stop the server.');
});