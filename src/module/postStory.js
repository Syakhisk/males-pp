const tfi = require("tools-for-instagram");
const ipa = require("instagram-private-api");
//prettier-ignore
const { StickerBuilder } = require("instagram-private-api/dist/sticker-builder");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const generateThumbnail = require("./generateThumbnail");
const clamp = require("clamp");
const chalk = require("chalk");

const readFileAsync = promisify(fs.readFile);

module.exports = async (ig, data) => {
  console.log(
    `\nProcessing storie(s) for ${chalk.magentaBright(
      data.seller
    )} at ${chalk.greenBright(data.dir)}\n`
  );
  let mentionSeller = await generateUerIdFromName(data.seller, 0.5, 0.5);
  let mentionUniday = await generateUerIdFromName(data.mention, 0.4, 0.5);

  if (data.stories.videos.length) {
    for (let video of data.stories.videos) {
      if (path.extname(video) == ".jpg") continue;

      const videoPath = path.join(data.dir, "stories", "videos", video);
      const videoBuffer = await readFileAsync(videoPath);
      const coverPath = await generateThumbnail(videoPath);
      const coverBuffer = await readFileAsync(coverPath);

      let options = {
        video: videoBuffer,
        coverImage: coverBuffer,
        stickerConfig: new StickerBuilder()
          .add(
            StickerBuilder.mention({
              userId: mentionSeller,
            }).center()
          )
          .add(
            StickerBuilder.mention({
              userId: mentionUniday,
            }).center()
          )
          .build(),
      };

      console.log(`${chalk.cyan("Publishing story, please wait...")}`);
      await ig.publish.story(options);
      console.log(`${video} is published as a story\n`);
    }
  }

  if (data.stories.photos.length) {
    for (let photo of data.stories.photos) {
      const photoPath = path.join(data.dir, "stories", "photos", photo);
      const photoBuffer = await readFileAsync(photoPath);

      let options = {
        file: photoBuffer,
        stickerConfig: new StickerBuilder()
          .add(
            StickerBuilder.mention({
              userId: mentionSeller,
            }).center()
          )
          .add(
            StickerBuilder.mention({
              userId: mentionUniday,
            }).center()
          )
          .build(),
      };

      console.log(`${chalk.cyan("Publishing story, please wait...")}`);
      await ig.publish.story(options);
      console.log(`${photo} is published as a story\n`);
    }
  }

  async function generateUerIdFromName(name, x, y) {
    x = clamp(x, 0.0001, 0.9999);
    y = clamp(y, 0.0001, 0.9999);
    const { pk } = await ig.user.searchExact(name);
    return pk;
  }

  console.log(`Stories for ${data.seller} is ${chalk.yellow("published")}`);
};
