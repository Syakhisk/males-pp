const tfi = require("tools-for-instagram");

const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const formatPhoto = require("./formatPhoto");

const readFileAsync = promisify(fs.readFile);
const clamp = require("clamp");
const chalk = require("chalk");

module.exports = async (ig = -1, data) => {
  console.log(
    `Processing photo for ${chalk.magentaBright(
      data.seller
    )} at ${chalk.greenBright(data.dir)}\n`
  );

  const mentionSeller = await generateUsertagFromName(data.seller, 0.5, 0.5);
  const mentionUniday = await generateUsertagFromName(data.mention, 0.4, 0.5);

  const photoFullPath = path.join(data.dir, "feeds", "photos", data.photos[0]);

  const formattedPhotos = await formatPhoto(photoFullPath);
  const photoBuffer = await readFileAsync(formattedPhotos);

  console.log(`${chalk.cyan("Publishing photo, please wait...")}`);
  let published = await ig.publish.photo({
    file: photoBuffer,
    caption: data.caption,
    usertags: {
      in: [mentionSeller, mentionUniday],
    },
  });

  console.log(
    `Photo for ${chalk.magentaBright(data.seller)} is ${chalk.yellow(
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
