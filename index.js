const inquirer = require(inquirer)
const mysql = require(mysql)

const mainMen = () => {
    inquirer.prompt({
        name: 'logDb',
        type: 'list',
        message: 'what would you like to do?',
        choices: ['View all employees',
            'View all employees by manager',
            'View all employees by department',
            'View all employees by role',
            'Add employee',
            'Add department',
            'Add roles',
            'Update employee roles']
    })
        .then((answer) => {
            switch (answer.logDb) {
                case 'View all employees':

                    break;

                case 'View all employees by manager':

                    break;

                case 'View all employees by department':

                    break;

                case 'View all employees by role':

                    break;

                case 'Add employee':

                    break;

                case 'Add department':

                    break;

                case 'Add roles':

                    break;

                case 'Update employee roles':

                    break;
            }
        })
}

const addEmp = () => {
    inquirer.prompt({
        name: 'firstName',
        type: 'input',
        message: 'Employee first name:',
    },
        {
            name: 'lastName',
            type: 'input',
            message: "Employee last name:"
        },
        {
            name: 'role',
            type: 'input',
            message: 'Employee role'
        },
        {
            name: 'empMan',
            type: 'input',
            message: 'Employee manager'
        })
        .then(answer){

    }
}

const addRole = () => {
    inquirer.prompt({
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
        })
        .then(answer){

    }
}

const addDep = () => {
    inquirer.prompt({
        name: 'newDep',
        type: 'input',
        message: 'Name of new department:'

    })
        .then(answer){

    }
}

