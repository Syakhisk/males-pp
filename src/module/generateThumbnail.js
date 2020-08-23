const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const util = require("util");
const chalk = require("chalk");

ffmpeg.setFfmpegPath(ffmpegPath);

module.exports = async (videoPath) => {
  let filenameNoExt = path.basename(videoPath, path.extname(videoPath));

  let promise = new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on("filenames", function (filenames) {
        filename = filenames[0];
        console.log("Generating thumbnail for", chalk.greenBright(filename));
      })
      .on("end", () => {
        console.log("Thumbnail generated\n");
        resolve();
      })
      .on("error", (err) => {
        reject();
      })
      .screenshots({
        timestamps: [1],
        filename: "cover_%b.jpg",
        folder: path.join(videoPath, ".."),
      });
  });

  let finalDir;

  await promise.then(() => {
    // console.log("inside ss promise");
    finalDir = path.join(videoPath, "..", `cover_${filenameNoExt}.jpg`);
  });

  return finalDir;
};
