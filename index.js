const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
let userLicense;
let licenseBadge;

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "userName",
      message: "What is your GitHub username??"
    },
    {
      type: "input",
      name: "projectTitle",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "Livesite",
      message: "if yes, what is the link to the live site. Include https://"
    },
    {
      type: "input",
      name: "description",
      message: "Write a short description of your project"
    },
    {
      type: "input",
      name: "installation",
      message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running."
    },
    {
      type: "input",
      name: "usage",
      message: "Please provide istructions and examples for use"
    },
    {
      type: "list",
      name: "license",
      message: "What kind of license should your project have?",
      choices: ["MIT", "APACHE 2.0", "GNU AGPLv3", "Mozilla Public 2.0", "none" ]
    },
    {
      type: "input",
      name: "contributors",
      message: "Does the user nned to know anything about contributing to the repo?"
    },
    {
      type: "input",
      name: "tests",
      message: "what command should be run to run tests?"
    },
    {
      type: "input",
      name: "questions",
      message: "What email adress should users direct questions to?"
    }
  ]);
}

function generate(answers) {
  if (answers.license === "none") {
     userLicense = "This software has no license";
  } else if (answers.license === "MIT") {
    licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    userLicense = "This software is licensed under MIT license";
  } else if (answers.license === "APACHE 2.0") {
    licenseBadge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    userLicense = "This software is licensed under APACHE 2.0 license";
  } else if (answers.license === "GNU AGPLv3") {
    licenseBadge = "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    userLicense = "This software is licensed under GNU AGPLv3 license";
  } else if (answers.license === "Mozilla Public 2.0") {
    licenseBadge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    userLicense = "This software is licensed under Mozilla Public 2.0 license";
  };
  return `
  # ${answers.projectTitle}

  ${licenseBadge} 

  ${answers.description}

  * [Installation](#Instilation)
  * [Usage](#Usage)
  * [License](#License)
  * [Contributors](#Contributors)
  * [Tests](#Tests)
  * [Questions](#Questions)
  

  ## Instilation

  ${answers.installation}


  ## Usage

  ${answers.usage}


  ## License

  ${userLicense} 

  ## Contributors
  
  ${answers.contributors}


  ## Tests

  ${answers.tests}
  
  ## Questions

  ${answers.questions}

`;
}

promptUser()
  .then(function(answers) {
    const readMeFile = generate(answers);

    return writeFileAsync("README.MD",  readMeFile);

  })
  .then(function() {
    console.log("Successfully created a README for your project");
  })
  .catch(function(err) {
    console.log(err);
  });



