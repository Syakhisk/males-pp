const moment = require("moment");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

module.exports = function (config) {
  function mkdirOverwrite(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  }

  let dirName = config.date + "_" + config.seller;
  let dirPath = path.join(__dirname, "..\\..", "client", dirName);
  let configString = JSON.stringify(config, null, "  ");

  try {
    mkdirOverwrite(dirPath);
    mkdirOverwrite(dirPath + "\\feeds\\");
    mkdirOverwrite(dirPath + "\\feeds\\photos\\");
    mkdirOverwrite(dirPath + "\\feeds\\videos\\");
    mkdirOverwrite(dirPath + "\\stories\\");
    mkdirOverwrite(dirPath + "\\stories\\photos\\");
    mkdirOverwrite(dirPath + "\\stories\\videos\\");

    fs.writeFile(path.join(dirPath, "config.json"), configString, (err) => {
      if (err) console.log(`Something went wrong`);
    });
  } catch (error) {
    return error;
  }

  return dirPath;
};
