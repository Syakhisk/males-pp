const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");

require("dotenv").config();

module.exports = async function () {
  var questions = [
    {
      type: "input",
      name: "username",
      message: "Instagram Username: ",
    },
    {
      type: "password",
      name: "password",
      message: "Instagram Password (not shared): ",
    },
  ];

  await inquirer.prompt(questions).then((answers) => {
    let file = `IG_USERNAME=${answers.username}\nIG_PASSWORD=${answers.password}\n#ONLINE_MODE=true`;
    const wfe = fs.promises.writeFile(".env", file, (err) => {
      if (err) console.log("Something went wrong..");
      else console.log(`Used as ${chalk.green(process.env.IG_USERNAME)}`);
    });
  });
};
