const mysql = require('mysql2');
const { prompt } = require('inquirer');
const table = require('console.table');
require('dotenv').config();

// Connect to our database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASS,
        database: 'trackman'
    },
    console.log('Now connected to the trackman database!'),
    firstPrompt()
);

function firstPrompt() {
    prompt([
        {
            type: 'list',
            message: 'WWhat would you like to do?',
            name: 'choice',
            choices: [
                'View all departments',
                'View all employee roles',
                'View all employees',
                'Update an employee',
                'Add an employee',
                'Delete an employee',
                'Add a role',
                'Add a department'
            ],
        },
    ])
}