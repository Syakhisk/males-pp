const tfi = require("tools-for-instagram");
const ipa = require("instagram-private-api");

const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const generateThumbnail = require("./generateThumbnail");
const formatVideo = require("./formatVideo");
const formatPhoto = require("./formatPhoto");

const readFileAsync = promisify(fs.readFile);
const clamp = require("clamp");
const chalk = require("chalk");
const { extname } = require("path");

module.exports = async (ig = -1, data) => {
  console.log(
    `\nProcessing album for ${chalk.magentaBright(
      data.seller
    )} at ${chalk.greenBright(data.dir)}\n`
  );

  let items = [];

  let mentionSeller = await generateUsertagFromName(data.seller, 0.5, 0.5);
  let mentionUniday = await generateUsertagFromName(data.mention, 0.4, 0.5);

  for (let photo of data.photos) {
    const photoFullPath = path.join(data.dir, "feeds", "photos", photo);
    const formattedPhotos = await formatPhoto(photoFullPath);
    const photoBuffer = await readFileAsync(formattedPhotos);
    items.push({
      file: photoBuffer,
      usertags: {
        in: [mentionSeller, mentionUniday],
      },
    });
  }

  for (let video of data.videos) {
    // path of the video

    if (extname(video) == ".jpg") continue;

    let videoPath = path.join(data.dir, "feeds", "videos", video);
    let formattedVid = await formatVideo(videoPath);
    let videoBuffer = await readFileAsync(formattedVid);
    let coverPath = await generateThumbnail(formattedVid);
    let coverBuffer = await readFileAsync(coverPath);

    items.push({
      video: videoBuffer,
      coverImage: coverBuffer,
      usertags: {
        in: [mentionSeller, mentionUniday],
      },
    });
  }

  console.log(`${chalk.cyan("Publishing album, please wait...")}`);
  await ig.publish.album({ items, caption: data.caption });
  console.log(
    `Album for ${chalk.magentaBright(data.seller)} is ${chalk.yellow(
      "published\n"
    )}`
  );

  async function generateUsertagFromName(name, x, y) {
    x = clamp(x, 0.0001, 0.9999);
    y = clamp(y, 0.0001, 0.9999);
    const { pk } = await ig.user.searchExact(name);
    return {
      user_id: pk,
      position: [x, y],
    };
  }
};
