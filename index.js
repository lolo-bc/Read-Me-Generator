const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?"
    }
    // {
    //   type: "input",
    //   name: "location",
    //   message: "Where are you from?"
    // },
    // {
    //   type: "input",
    //   name: "hobby",
    //   message: "What is your favorite hobby?"
    // },
    // {
    //   type: "input",
    //   name: "food",
    //   message: "What is your favorite food?"
    // },
    // {
    //   type: "input",
    //   name: "github",
    //   message: "Enter your GitHub Username"
    // },
    // {
    //   type: "input",
    //   name: "linkedin",
    //   message: "Enter your LinkedIn URL."
    // }
  ]);
}

function generateHTML(answers) {
  return `
 ${answers.projectName}
`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("README.MD", md);
  })
  .then(function() {
    console.log("Successfully created a README for your project");
  })
  .catch(function(err) {
    console.log(err);
  });
