require('dotenv').config();

const fs = require('fs').promises;
const path = require('path');
const mysql = require('mysql2/promise');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

async function setupDatabase() {
  let connection;
  try {
    console.log('Connecting to MySQL server...');
    connection = await mysql.createConnection({
      host: DB_HOST || 'localhost',
      port: DB_PORT || 3306,
      user: DB_USER || 'root',
      password: DB_PASSWORD,
      multipleStatements: true
    });
    console.log('Successfully connected.');

    console.log('Reading setup.sql file...');
    const sqlScript = await fs.readFile(path.join(__dirname, 'setup.sql'), 'utf-8');

    console.log('Executing SQL script to create database and tables...');
    await connection.query(sqlScript);

    console.log('Database and tables created successfully!');

  } catch (error) {
    console.error('Error during database setup:');
    console.error(error.message);

    if (error.code === 'ECONNREFUSED') {
      console.error('Hint: Is your MySQL server running?');
    }
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Hint: Check your DB_USER and DB_PASSWORD in the .env file.');
    }

  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed.');
    }
  }
}

setupDatabase();