const tfi = require("tools-for-instagram");
const ipa = require("instagram-private-api");
//prettier-ignore
const { StickerBuilder } = require("instagram-private-api/dist/sticker-builder");
const path = require("path");
const { readFile } = require("fs");
const { promisify } = require("util");
const generateThumbnail = require("../generateThumbnail");

const readFileAsync = promisify(readFile);

(async () => {
  let ig = await login();
  const path =
    "E:\\codes\\instagram-bot\\client\\123_ksihkays\\stories\\videos\\Lorem Ipsum Video.mp4";
  const file = await readFileAsync(path);

  // const coverImagePath = await generateThumbnail(path);
  const coverImagePath =
    "E:\\codes\\instagram-bot\\client\\123_ksihkays\\stories\\videos\\cover_Lorem Ipsum Video.mp4";
  const coverImageBuffer = await readFileAsync(coverImagePath);

  let id = await ig.user.getIdByUsername("syakhisk");
  let id2 = await ig.user.getIdByUsername("ksihkays");

  await ig.publish.story({
    video: file,
    coverImage: coverImageBuffer,
    stickerConfig: new StickerBuilder()
      .add(
        StickerBuilder.mention({
          userId: id,
        }).center()
      )
      .add(
        StickerBuilder.mention({
          userId: id2,
        }).center()
      )
      .build(),
  });

  await console.log("Done!");
})();
