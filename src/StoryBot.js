require("tools-for-instagram");

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const login = require("tools-for-instagram/src/login");

const readDirAsync = promisify(fs.readdir);

(async () => {
  console.log("\n -- Logging In From Cookies --\n".bold.underline);

  const cookies = await readDirAsync(path.join(__dirname, "cookies"));
  const usernames = cookies.map((username) => {
    return username.replace(".json", "");
  });

  let igs = [];

  for (user of usernames) {
    console.log(`Iterating cookies...`);
    let ig = await login({
      inputLogin: user,
      inputPassword: "",
      onlineMode: false,
    });

    igs.push(ig);
  }

  console.log("\nProcess done!\n".green);
  console.log(igs);
})();
