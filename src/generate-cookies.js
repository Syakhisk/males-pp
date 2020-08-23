const tfi = require("tools-for-instagram");
global.noLogo = true;
const ipa = require("instagram-private-api");
const inqDataIG = require("./module/inqDataIG");
const inquirer = require("inquirer");

async function login_func() {
  const data = await inqDataIG();

  const ig = await login({
    inputLogin: data.username,
    inputPassword: data.password,
  });
}

(async () => {
  let condition = true;
  await login_func();

  while (condition) {
    await inquirer
      .prompt([
        {
          type: "confirm",
          name: "response",
          message: "Wanna do another login?",
        },
      ])
      .then((answers) => {
        if (answers.response == true) {
          login_func();
        } else {
          condition = false;
        }
      });
  }
})();
