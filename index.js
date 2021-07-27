const { prompt } = require('inquirer');
const table = require('console.table');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the trackman database!');
    firstPrompt();
});

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
                'Add an employee role',
                'Add a department'
            ],

        }
    ]).then(response => {
        {
            switch (response.choice) {
                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all employee roles':
                    viewRole();
                    break;

                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'Update an employee':
                    updateEmployee();
                    break;

                case 'Add an Employee':
                    addEmployee();
                    break;

                case 'Delete an employee':
                    deleteEmployee();
                    break;

                case 'Add an employee role':
                    addRole();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;
            }
        }
    })
    function viewDepartments() {
        db.query(`SELECT * FROM department`, (err, res) => {
            if (err) throw err;
            console.table(res);
            firstPrompt();
        });
    }
    function viewRole() {
        db.query(`SELECT * FROM role, department WHERE dept_id = department.id`, (err, res) => {
            if (err) throw err;
            console.table(res);
            firstPrompt();
        });
    }
    function viewAllEmployees() {
        db.query(`SELECT * FROM employee`,
            (err, res) => {
                if (err) throw err;
                console.table(res);
                firstPrompt();
            })
    }
}