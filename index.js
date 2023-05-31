
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "WOLFpack99",
    database: "employee_db"
})
require("console.table")

db.connect(function () {
    console.log('Welcome to Employee Tracker CLI app')
    start_menu()
})
const questions = [{
    type: 'list',
    message: "what would you like to do?",
    name: 'like_to_do',
    choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit", "View All Employees"],
}]

const start_menu = () => {
    inquirer.prompt(questions)
        .then(({ like_to_do }) => {
            switch (like_to_do) {
                case "Add Department":
                    adddepartment()
                    break;
                case "Add Role":
                    addrole()
                    break;
                case "Add Employee":
                    addemployee()
                    break;
                case "View All Roles":
                    viewallrole()
                    break;
                case "View All Departments":
                    viewalldepartments()
                    break;
                case "Update Employee Role":
                    updateemployeerole()
                    break;
                case "View All Employees":
                    viewallemployees()
                    break;
                case "Quit":
                    db.end()
                    process.exit(0)
            }
        })
}

function viewallemployees() {
    db.query('select * from employee;', function (err, data) {
        if (err) throw err;
        console.table(data)
        start_menu()
    })
}
function viewalldepartments() {
    db.query('select d.id,d.department_name,r.id, r.title, r.salary, e.first_name, e.last_name from department d left join role r on r.department_id = d.id   left join employee e on e.role_id = r.id;',
        function (err, data) {
            if (err) throw err;
            console.table(data)
            start_menu()
        })
}
function viewallrole() {
    db.query('select * from role;', function (err, data) {
        if (err) throw err;
        console.table(data)
        start_menu()
    })
}
function adddepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Enter Department Name"
        }
    ]).then(input => {
        db.query(`INSERT INTO department (department_name)
    VALUES ("${input.department}"),`, function (err, data) {
            if (err) throw err;
            console.table(data)
            start_menu()
        })
    })
}
function addrole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter Title"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter Salary"
        },
        {
            name: "department_id",
            type: "list",
            choices:[
                {name:"Sales",value:1},
                {name:"Engineering", value:2},
                {name:"Finance",value:3},
                {name:"Legal", value:4},
            ],
            message: "Enter Department ID"
        }
    ]).then(input => {   
    db.query(`INSERT INTO role (title, salary, department_id)VALUES ("${input.title}",${input.salary},${input.department_id})`, function (err, data) {
        if (err) throw err;
        console.table(data)
        start_menu()
    })
})
}
function addemployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
        {
            type: "input",
            name: "role",
            message: "What is the employees's role ID?"
        },
        {
            type: "input",
            name: "manager",
            message: "What is the manager's ID?",
        }
    ]
    ).then(response => {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstName, response.lastName, response.role, response.manager], (error) => {
            if (error) throw error;
            console.table(data)
            start_menu()
        })
    })
}
function updateemployeerole() {
    inquirer.prompt([
     
        {
            name: "employee_id",
            type: "list",
            choices:[
                {name:"John Doe",value:1},
                {name:"Engineering", value:2},
                {name:"Finance",value:3},
                {name:"Legal", value:4},
            ],
            message: "Enter Department ID"
        },
           
        {
            name: "role_id",
            type: "list",
            choices:[
                {name:"Sales Lead",value:1},
                {name:"Engineering", value:2},
                {name:"Finance",value:3},
                {name:"Legal", value:4},
            ],
            message: "Enter Department ID"
        },
    ]).then(input => { 
    db.query(`update employee set role_id=${input.role_id} where id=${input.employee_id}`, function (err, data) {
        if (err) throw err;
        console.table(data)
        start_menu()
    })
})
}
