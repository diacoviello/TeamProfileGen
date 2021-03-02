const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const members = [];
const idArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function userPrompt(answers) {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function (response) {
      if (response.role === "Manager") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is the manager's name?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              },
            },
            {
              type: "input",
              name: "id",
              message: "What is the manager's ID Number?",
              validate: (answer) => {
                if (answer !== "") {
                  //validate ID's do not match
                  return true;
                }
                return "Please enter a valid ID.";
              },
            },
            {
              type: "input",
              name: "email",
              message: "What is your e-mail?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter a valid email.";
              },
            },
            {
              type: "input",
              name: "office",
              message: "What is your office number?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Office Number is required.";
              },
            },
          ])
          .then(function (managerRes) {
            var newManager = new Manager(
              managerRes.name,
              managerRes.email,
              managerRes.id,
              managerRes.office
            );
            members.push(newManager);
            addUser();
          });
      } else if (response.role === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is the engineer's name?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              },
            },
            {
              type: "input",
              name: "id",
              message: "What is the engineer's employee ID Number?",
              validate: (answer) => {
                if (answer !== "") {
                  //validate ID's do not match
                  return true;
                }
                return "Please enter a valid ID number.";
              },
            },
            {
              type: "input",
              name: "email",
              message: "What is the engineer's e-mail?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter a valid email.";
              },
            },
            {
              type: "input",
              name: "github",
              message: "What is the engineer's GitHub username?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Github username is required.";
              },
            },
          ])
          .then(function (engineerRes) {
            var newEngineer = new Engineer(
              engineerRes.name,
              engineerRes.email,
              engineerRes.id,
              engineerRes.github
            );
            console.log(newEngineer);
            members.push(newEngineer);
            addUser();
          });
      } else if (response.role === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is this intern's name?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
              },
            },
            {
              type: "input",
              name: "id",
              message: "What is this intern's provided ID Number?",
              validate: (answer) => {
                if (answer !== "") {
                  //validate ID's do not match
                  return true;
                }
                return "Please enter a valid ID number";
              },
            },
            {
              type: "input",
              name: "email",
              message: "What is this intern's e-mail?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter a valid email.";
              },
            },
            {
              type: "input",
              name: "school",
              message: "What school did this intern attend?",
              validate: (answer) => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter a valid school name.";
              },
            },
          ])
          .then(function (internRes) {
            var newIntern = new Intern(
              internRes.name,
              internRes.email,
              internRes.id,
              internRes.school
            );
            console.log(newIntern);
            members.push(newIntern);
            addUser();
          });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addUser() {
  inquirer
    .prompt([
      {
        name: "continue",
        message: "Would you like to add another team member?",
        type: "confirm",
      },
    ])
    .then(function (confirmRes) {
      confirmRes.continue ? userPrompt() : generateHTML();
    });
}

userPrompt();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function generateHTML() {
  // put html here
  fs.writeFile(outputPath, render(members), "UTF-8", (err) => {
    console.log("Write to file");
    if (err) throw err;
  });
  console.log(members);
}

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
