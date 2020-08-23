const inquirer = require("inquirer");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);
const path = require("path");
const moment = require("moment");
const { resolve } = require("path");

module.exports = async () => {
  const validateAtSign = (value) => {
    if (/(@|\s)/.test(value)) return "Plz don't use the @ or space";
    else if (/\S/.test(value)) return true;
    return "Plz enter the data :(";
  };
  let validateRequired = (value) => {
    if (/\S/.test(value)) {
      return true;
    }

    return "Enter the data plz";
  };

  const configQuestion = [
    {
      type: "input",
      name: "seller",
      message: "Plz type out instagram seller (w/o @ sign)",
      validate: validateAtSign,
    },
    {
      type: "input",
      name: "mention",
      message: "Plz type out another account to mention (w/o @ sign)",
      validate: validateAtSign,
    },
    {
      type: "editor",
      name: "caption",
      message: "Plz type out the caption (emoji will show 🧓 but it's okay)",
    },
  ];

  const initialQuestion = {
    type: "list",
    name: "action",
    choices: ["Create New PP (initialize)", "Publish existing PP"],
  };

  async function main() {
    const dir = path.join(__dirname, "..", "client");
    const choice = await inquirer.prompt(initialQuestion);
    let date = moment().format("DD-M-yyyy");

    if (choice.action == "Publish existing PP") {
      let availableFolder = await readdirAsync(dir);

      const selected = await inquirer.prompt({
        type: "list",
        name: "selectedFolder",
        message: "Select the folder plz",
        choices: availableFolder,
      });

      let configPath = path.join(dir, selected.selectedFolder, "config.json");
      // console.log("configpath:", configPath);

      try {
        let initial = await readFileAsync(configPath);
        return [JSON.parse(initial), true];
      } catch (error) {
        if (error.code == "ENOENT") {
          console.log("\nconfig.json file was not found");
          console.log("plz delete the folder and try again :(");
        }
      }
    } else {
      /* -- if choosing create new pp file -- */
      let config = await inquirer.prompt(configQuestion);

      /* add uniday and date */
      // config.mention = "unidaysmanda";
      config.date = date;

      return [config, false];
    }
  }

  return await main();
};
