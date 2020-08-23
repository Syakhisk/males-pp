const chalk = require("chalk");
const figlet = require("figlet");

module.exports = function () {
  console.log(
    `${chalk.white(
      figlet.textSync(" Males-PP ", {
        horizontalLayout: "full",
      })
    )}\n`
  );
};
