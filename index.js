const inquirer = require('inquirer')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
});

connection.connect()
const updateRole = () => {
    console.log('is this working');
    inquirer.prompt([
        {
            name: 'empId',
            type: 'input',
            message: 'Insert employee ID:'


        },
        {
            name: 'empRole',
            type: 'input',
            message: "New employee role ID:"
        }
    ])

        .then((answers) => {
            connection.query(
                'UPDATE employee SET roleId = ? WHERE id = ?',
                [answers.empRole, answers.empId], (err) => {
                    if (err) throw err
                    mainMen();
                }

            )

        })
}


//connection.query(
//'UPDATE employee SET ? WHERE?',
//[{managerId: answers.empMan}, {id: answers.empId}]
//)

const viewEmp = () => {
    connection.query(
        'SELECT employee.id, employee.firstName, employee.lastName, employee.managerId, role.title AS Role, department.name AS Department  FROM employee LEFT JOIN role ON employee.roleId = role.id LEFT JOIN department ON role.departmentId = department.id', function (err, data) {
            console.table(data)
            mainMen();
            if (err) throw err
        }
    )
}
const viewDep = () => {
    connection.query(
        'SELECT * FROM department', function (err, data) {
            console.table(data)
            mainMen();
            if (err) throw err
        }
    )
}
const viewRole = () => {
    connection.query(
        'SELECT * FROM role', function (err, data) {
            console.table(data)
            mainMen();
            if (err) throw err
        }
    )
}
const addEmp = () => {


    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Employee first name:'
        },
        {
            name: 'lastName',
            type: 'input',
            message: "Employee last name:"
        },
        {
            name: 'role',
            type: 'input',
            message: 'Employee role id:'
        },
        {
            name: 'empMan',
            type: 'input',
            message: 'Employee manager id:'
        }])



        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',

                {
                    firstName: answer.firstName,
                    lastName: answer.lastName,
                    roleId: answer.role,
                    managerId: answer.empMan,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your new employee was added!');

                    mainMen();
                }
            );

        })
}

const addRole = () => {




    inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'Name of new role:'
        },
        {
            name: 'roleSal',
            type: 'input',
            message: 'Salary of new role:'
        },
        {
            name: 'roleDep',
            type: 'input',
            message: 'Role department:'
        }
    ])
        .then((answer) => {
            connection.query(
                'INSERT INTO role SET ?',

                {
                    title: answer.newRole,
                    salary: answer.roleSal,
                    departmentId: answer.roleDep,

                },
                (err) => {
                    if (err) throw err;
                    console.log('Your new role was added!');

                    mainMen();
                }
            );

        })
}

const addDep = () => {
    //viewDep();

    inquirer.prompt([
        {
            name: 'newDep',
            type: 'input',
            message: 'Name of new department:'

        }
    ])
        .then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',

                {
                    name: answer.newDep
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your new department was added!');

                    mainMen();
                }
            );

        })
}

const mainMen = () => {
    inquirer.prompt({
        name: 'logDb',
        type: 'list',
        message: 'what would you like to do?',
        choices: ['View', 'Add', 'Update']
    })
        .then((answer) => {
            switch (answer.logDb) {
                case 'View':
                    inquirer.prompt({
                        name: 'viewChoice',
                        type: 'list',
                        message: 'What would you like to view?',
                        choices: ['Employees', 'Departments', 'Roles']
                    })
                        .then((answer) => {
                            if (answer.viewChoice === 'Employees') {
                                viewEmp()
                            }
                            else if (answer.viewChoice === 'Departments') {
                                viewDep()
                            }
                            else if (answer.viewChoice === 'Roles') {
                                viewRole()
                            }
                        })

                    break;

                case 'Add':
                    inquirer.prompt({
                        name: 'addChoice',
                        type: 'list',
                        message: 'What would you like to add?',
                        choices: ['Employees', 'Departments', 'Roles']
                    })
                        .then((answer) => {
                            if (answer.addChoice === 'Employees') {
                                addEmp()
                            }
                            else if (answer.addChoice === 'Departments') {
                                addDep()
                            }
                            else if (answer.addChoice === 'Roles') {
                                addRole()
                            }
                        })
                    break;

                // case 'Remove':
                //     inquirer.prompt({
                //         name: 'remChoice',
                //         type: 'list',
                //         message: 'What would you like to remove?',
                //         choices: ['Employees', 'Departments', 'Roles']
                //     })
                //         .then((answer) => {
                //             if (answer.remChoice === 'Employees') {

                //             }

                //             else if (answer.remChoice === 'Departments') {

                //             }

                //             else if (answer.remChoice === 'Roles') {

                //             }
                //         })

                //     break;

                case 'Update':
                    inquirer.prompt({
                        name: 'updateChoice',
                        type: 'list',
                        message: 'What would you like to update',
                        choices: ['Employee Role']
                    })
                        .then((answer) => {
                            if (answer.updateChoice === 'Employee Role') {
                                updateRole()
                            }

                        })


                    break;

            }
        })
}

mainMen()