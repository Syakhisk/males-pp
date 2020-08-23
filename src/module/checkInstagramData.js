require("dotenv").config();
const fs = require("fs");
const chalk = require("chalk");
const inqDataIG = require("./inqDataIG");

module.exports = async () => {
  if (!process.env.IG_USERNAME || !process.env.IG_PASSWORD) {
    let user = await inqDataIG();
    let data = `IG_USERNAME=${user.username}\nIG_PASSWORD=${user.password}\n#ONLINE_MODE=FALSE`;

    fs.writeFile(".env", data, (err) => {
      if (err) console.log(`Something went wrong`);
    });
    process.env.IG_USERNAME = user.username;
    process.env.IG_PASSWORD = user.password;
    console.log(`${chalk.gray(".env")} is updated`);
  }

  console.log(`Using ${chalk.blueBright("@" + process.env.IG_USERNAME)}`);
  console.log(
    `${chalk.cyanBright(
      "to modify your login account, edit with notepad"
    )} ${chalk.green("Males-PP/code/.env\n")} ;)`
  );
};
