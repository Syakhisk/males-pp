const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
var sizeOf = require("image-size");

const { basename, extname, join } = require("path");

module.exports = async (dir) => {
  console.log(`Formatting ${chalk.greenBright(path.basename(dir))}...`);

  /* -- sudah sesuai format -- */
  let image = sizeOf(dir);
  if (image.height == image.width && image.type == "jpg") {
    console.log(
      `${chalk.greenBright(path.basename(dir))} is already in format\n`
    );
    return dir;
  }
  /* -- belum sesuai format -- */
  let filenameNoExt = path.basename(dir, path.extname(dir));
  let convertedFile = "converted_" + filenameNoExt + ".jpg";

  await Jimp.read(dir)
    .then((pic) => {
      return pic
        .quality(60) // set JPEG quality
        .contain(800, 800)
        .write(join(dir, "..", "converted_" + filenameNoExt) + ".jpg"); // save
    })
    .catch((err) => {
      console.error(err);
    });

  console.log("Formatting done\n");
  return join(dir, "..", convertedFile);
};
