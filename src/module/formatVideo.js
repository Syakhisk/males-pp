const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { resolve } = require("path");
const { reject } = require("delay");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

// let dir = "E:\\codes\\instagram-bot\\client\\Test\\2020-07-03 14-41-13.mkv";

module.exports = async (dir) => {
  console.log(`Formatting ${chalk.greenBright(path.basename(dir))}...`);

  let filenameNoExt = path.basename(dir, path.extname(dir));
  let convertedFile = "converted_" + filenameNoExt + ".mp4";

  let promise = new Promise((resolve, reject) => {
    ffmpeg(dir)
      .size("800x?")
      .aspect("1:1")
      .autopad("white")
      .on("end", () => {
        console.log("Video formatted\n");
        resolve();
      })
      .on("error", (err) => {
        console.log("Something wrong in formatVideo.js");
        reject(err);
      })
      .save(path.join(dir, "..", convertedFile));
  });

  let finalDir;

  await promise.then(() => {
    // console.log("inside promise");
    finalDir = path.join(dir, "..", convertedFile);
  });

  return finalDir;
};
