require("dotenv").config();

const fs = require("fs");
const inquirer = require("inquirer");
const chalk = require("chalk");

module.exports = async () => {
  let validateRequired = (value) => {
    if (/\S/.test(value)) {
      return true;
    }

    return "Enter the data plz";
  };

  let questions = [
    {
      type: "input",
      name: "username",
      message: "Instagram Username: ",
      validate: validateRequired,
    },
    {
      type: "password",
      name: "password",
      mask: "*",
      message: "Instagram Password (not shared): ",
      validate: validateRequired,
    },
  ];

  let username;
  let password;

  await inquirer.prompt(questions).then((answers) => {
    username = answers.username;
    password = answers.password;
  });
  return { username, password };
};
