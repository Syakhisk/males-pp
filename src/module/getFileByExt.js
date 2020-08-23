const fs = require("fs");
const path = require("path");
const dir = "__dirname";
// const dir = "../../client/";

// let currentFolder = "username_15-8-2020_15.00" + "/photo";

module.exports = (dir, ext) => {
  function extension(element) {
    var extName = path.extname(element);
    return extName === ext;
  }
  function notExtension(element) {
    var extName = path.extname(element);
    return extName != ext;
  }
  let files = fs.readdirSync(dir);
  let validFiles = files.filter(extension);
  let invalidFiles = files.filter(notExtension);

  return {
    validFiles,
    invalidFiles,
  };
};
