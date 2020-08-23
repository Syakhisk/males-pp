const fs = require("fs");
const path = require("path");
const dir = "__dirname";
// const dir = "../../client/";

// let currentFolder = "username_15-8-2020_15.00" + "/photo";

module.exports = async (dir) => {
  let files = fs.readdirSync(dir);

  return files;
};
