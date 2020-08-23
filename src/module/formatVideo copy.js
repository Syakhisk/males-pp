const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const util = require("util");
ffmpeg.setFfmpegPath(ffmpegPath);

// let dir = "E:\\codes\\instagram-bot\\client\\Test\\2020-07-03 14-41-13.mkv";

module.exports = async (dir) => {
  console.log("Formatting...");

  let filenameNoExt = path.basename(dir, path.extname(dir));
  let convertedFile = "converted_" + filenameNoExt + ".mp4";

  function format(dir) {
    let proc = ffmpeg(dir)
      .size("800x?")
      .aspect("1:1")
      .autopad("white")
      .on("start", () => console.log("Formatting video..."))
      .save(path.join(dir, "..", convertedFile));

    return convertedFile;
  }

  let formatPromise = util.promisify(format);
  // await formatPromise(dir).then((data) => {
  //   console.log("Finished formatting", data);
  // });

  return convertedFile;
};
