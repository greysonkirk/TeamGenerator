//pulling in all the employee types 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//where the employees will be stored
let employeeArr = []

//output path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//function to add employee
addEmployee();

function addEmployee() {
    //all the initial questions
    inquirer
        .prompt([{
                type: 'checkbox',
                name: 'role',
                message: "What is the employee's role?",
                choices: ['Manager', 'Engineer', 'Intern']
            },
            {
                type: 'text',
                name: 'name',
                message: "What is the Employee's name?"
            },
            {
                type: 'text',
                name: 'id',
                message: "What is the employee's ID number?"
            },
            {
                type: 'text',
                name: 'email',
                message: "What is the employee's email?"
            },
            {
                type: 'number',
                name: 'exp',
                message: "How many years experince does employee have?"
            },

        ])
        .then((response) => {
            console.log(response.role)
                //based on employee role, ask certain questions
            if (response.role == 'Manager') {
                inquirer
                    .prompt([{
                            type: 'text',
                            name: 'office',
                            message: "What is the Manager's office number?"
                        },
                        {
                            type: 'confirm',
                            name: 'addEmp',
                            message: "Would you like to add another employee?",
                            default: false
                        }
                    ])
                    .then((answer) => {
                        employeeArr.push(new Manager(response.name, response.id, response.email, answer.office))
                        if (answer.addEmp) {
                            addEmployee();
                        } else {
                            rendHTML();
                        }

                        // console.log(employeeArr)
                    })
            } else if (response.role == 'Engineer') {
                inquirer
                    .prompt([{
                            type: 'text',
                            name: 'github',
                            message: "What is the Engineer's Github username?"
                        },
                        {
                            type: 'confirm',
                            name: 'addEmp',
                            message: "Would you like to add another employee?",
                            default: false
                        }
                    ])
                    .then((answer) => {
                        employeeArr.push(new Engineer(response.name, response.id, response.email, answer.github))

                        if (answer.addEmp) {
                            addEmployee();
                        } else {
                            rendHTML();
                        }
                        // console.log(engineer)
                    });
            } else {
                inquirer
                    .prompt([{
                            type: 'text',
                            name: 'school',
                            message: "What is the Intern's school?"
                        },
                        {
                            type: 'confirm',
                            name: 'addEmp',
                            message: "Would you like to add another employee?",
                            default: false
                        }
                    ])
                    .then((answer) => {
                        employeeArr.push(new Intern(response.name, response.id, response.email, response.exp, answer.school))


                        if (answer.addEmp) {
                            addEmployee();
                        } else {
                            rendHTML();
                        }
                        // console.log(intern)

                    })
            }

        })
};
//render html page
function rendHTML() {
    let html = render(employeeArr);
    fs.writeFile(outputPath, html, function(error) {
        if (error) { console.log(error) }
    })
};