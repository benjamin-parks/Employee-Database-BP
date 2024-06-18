const inquirer = require('inquirer');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
const pool = new Pool({
    user: 'postgres', // TODO: Enter PostgreSQL username
    password: 'password', // TODO: Enter PostgreSQL password
    host: 'localhost',
    database: 'business_db'
}, console.log(`Connected to the business_db database.`));

pool.connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const mainQuestions = [
    {
        type: 'list',
        name: 'menuSelection',
        message: 'What would you like to do?',
        choices: [
            'Add a department',
            'Add a role',
            'Add an employee',
            'View departments',
            'View roles',
            'View employees',
            'Exit'
        ]
    }
];

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department?'
    }
];

const addRoleQuestions = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'What is the title of the role?'
    },
    {
        type: 'input',
        name: 'employeeSalary',
        message: "What is the employee's salary?"
    },
    {
        type: 'input',
        name: 'roleDepartment',
        message: 'What is the department ID of the role?'
    }
];

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the first name of the employee?'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'What is the last name of the employee?'
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'Role ID of employee?'
    },
    {
        type: 'input',
        name: 'employeeDepartment',
        message: 'Department ID of employee?'
    }
];

function mainMenu() {
    inquirer.prompt(mainQuestions).then(answers => {
        switch (answers.menuSelection) {
            case 'Add a department':
                inquirer.prompt(addDepartmentQuestions).then(departmentAnswers => {
                    pool.query(
                        `INSERT INTO departments (department_name) VALUES ($1) RETURNING *;`,
                        [departmentAnswers.departmentName],
                        (err, result) => {
                            if (err) {
                                console.error('Error inserting department:', err);
                            } else {
                                console.log('Inserted department:', result.rows[0]);
                            }
                            mainMenu(); // Return to main menu
                        }
                    );
                });
                break;
            case 'Add a role':
                inquirer.prompt(addRoleQuestions).then(roleAnswers => {
                    pool.query(
                        `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;`,
                        [roleAnswers.roleTitle, roleAnswers.employeeSalary, roleAnswers.roleDepartment],
                        (err, result) => {
                            if (err) {
                                console.error('Error inserting role:', err);
                            } else {
                                console.log('Inserted role:', result.rows[0]);
                            }
                            mainMenu(); // Return to main menu
                        }
                    );
                });
                break;
            case 'Add an employee':
                inquirer.prompt(addEmployeeQuestions).then(employeeAnswers => {
                    pool.query(
                        `INSERT INTO employee (first_name, last_name, role_id, department_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
                        [employeeAnswers.employeeFirstName, employeeAnswers.employeeLastName, employeeAnswers.role_id, employeeAnswers.employeeDepartment],
                        (err, result) => {
                            if (err) {
                                console.error('Error inserting employee:', err);
                            } else {
                                console.log('Inserted employee:', result.rows[0]);
                            }
                            mainMenu(); // Return to main menu
                        }
                    );
                });
                break;
            case 'View departments':
                pool.query(`SELECT * FROM departments;`, (err, result) => {
                    if (err) {
                        console.error('Error selecting departments:', err);
                    } else {
                        console.table(result.rows);
                    }
                    mainMenu(); // Return to main menu
                });
                break;
            case 'View roles':
                pool.query(`SELECT * FROM role;`, (err, result) => {
                    if (err) {
                        console.error('Error selecting roles:', err);
                    } else {
                        console.table(result.rows);
                    }
                    mainMenu(); // Return to main menu
                });
                break;
            case 'View employees':
                pool.query(`SELECT * FROM employee;`, (err, result) => {
                    if (err) {
                        console.error('Error selecting employees:', err);
                    } else {
                        console.table(result.rows);
                    }
                    mainMenu(); // Return to main menu
                });
                break;
            case 'Exit':
                pool.end();
                process.exit();
                break;
        }
    });
}

mainMenu();