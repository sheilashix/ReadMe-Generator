const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const myfile = util.promisify(fs.writeFile);

function AskUser() {

    return inquirer.prompt([
        {
            type: "input",
            name: "project_title",
            message: "What is your Project name"
        },
        {
            type: "input",
            name: "description",
            message: "Briefly describe your project"
        },
        {
            type: "input",
            name: "install",
            message: "Are there any installations required"
        },
        {
            type: "input",
            name: "use",
            message: "What is this Application used for"
        },
        {
            type: "input",
            name: "contributions",
            message: "Do you have any contribution Rules"
        },
        {
            type: "input",
            name: "test",
            message: "Please provide test instructions if applicable"
        },
        {
            type: "checkbox",
            message: "License?",
            name: "license",
            choices: [
                "[MIT License](LICENSE.txt)",

            ]
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address"
        },
        {
            type: "input",
            name: "github",
            message: "Enter your github username"
        }
    ]);
}

function generateREADME(answers) {
    return `# ${answers.project_title}
  #### Table of Contents
1. [Project Description](#project_description)
2. [Installation Instructions](#installation_instructions)
3. [Usage Information](#usage_information)
4. [Contributor Guidelines](#contributor_guidelines)
5. [Code of Conduct](#conduct_code)
6. [Test Instructions](#test_instructions)
7. [License](#license)
8. [Questions](#questions)
* ${answers.description}
* ${answers.install}
* ${answers.use}
* ${answers.contributions}
* [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)
## Test Instructions
* ${answers.test}
## License
* licensed under the ${answers.license}
## Questions
* For additional help or questions about collaboration, please reach out to ${answers.email}
* Follow me on Github at [${answers.github}](http://github.com/${answers.github})`;

}

AskUser
    ()
    .then(function (answers) {
        const readme = generateREADME(answers);


        return myfile("README.md", readme);
    })
    .then(function () {
        console.log(" README.md Generated!");
    })
    .catch(function (err) {
        console.log(err);
    });