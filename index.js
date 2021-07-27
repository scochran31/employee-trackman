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
            message: 'What would you like to do?',
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
                    viewRoles();
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
    async function viewDepartments() {
        const dept = await db.promise().query(`SELECT * FROM department`)
        console.table(dept[0]);
            firstPrompt();
    };
    // }
    async function viewRoles() {
        const roles = await db.promise().query(`SELECT * FROM roles`);
        console.table(roles[0]);
        firstPrompt();
    };

    async function viewAllEmployees() {
        const allEmp = db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, department.dept_name AS department, roles.salary
        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
        LEFT JOIN employee manager ON manager_id = employee.manager_id`);
        console.table(allEmp[0]);
        firstPrompt();
    }
}
