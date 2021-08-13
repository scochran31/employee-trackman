const mysql = require('mysql2');
require('dotenv').config();

// Connect to our database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASS,
        database: 'trackman'
    },
    console.log('Connected to the trackman database!')
);

module.exports = db;