const { prompt } = require('inquirer');
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
                'Add an employee',
                'Add an employee role',
                'Add a department',
                'Update employee role',
                'Quit Application'
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

                case 'Add an Employee':
                    addEmployee();
                    break;

                case 'Add an employee role':
                    addRole();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Update employee role':
                    updateEmployee();
                    break;

                case 'Quit Application':
                    process.exit();
            }
        }
    })

    async function viewDepartments() {
        const dept = await db.promise().query(`SELECT * FROM department`)
        console.table(dept[0]);
            firstPrompt();
    };

    async function viewRoles() {
        const roles = await db.promise().query(`
        SELECT roles.id, roles.title, department.dept_name AS dept, roles.salary FROM roles
        LEFT JOIN department ON roles.dept_id = department.id`);
        console.table(roles[0]);
        firstPrompt();
    };

    async function viewAllEmployees() {
        const allEmp = db.promise().query(`
        SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, department.dept_name AS department, roles.salary
        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
        LEFT JOIN employee manager ON manager_id = employee.manager_id`);
        console.table(allEmp[0]);
        firstPrompt();
    };

    async function addEmployee() {
        const position = await db.promise().query(`SELECT * FROM roles`);
        const mgr = await db.promise().query(`SELECT * FROM employee`);
        const job = position[0].map((roles) => {
            return {
                name: roles.title,
                value: roles.id
            }
        });

        const availMgr = mgr[0].map((manager) => {
            return {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            }
        });

        const newEmp = await prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: 'Please select the new employee role',
                choices: job
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Select employee manager',
                choices: availMgr
            }
        ]);

        let answer = [newEmp.first_name, newEmp.last_name, newEmp.role, newEmp.manager];

        await db.promise().query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, answer);
        console.log(`========Employee added to Database========`);
        firstPrompt();
    };


}

firstPrompt();