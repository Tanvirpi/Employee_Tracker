const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = [{
    type: 'list',
    message: "what would you like to do?",
    name: 'like_to_do',
    choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit", "View All Employees"],
}]

const start_menu=(record) => {
inquirer.prompt(questions)
 .then(({like_to_do}) =>{
    switch(like_to_do){
        case "Add department":
            adddepartment()
            break;

    }
 })
}
    


