const tfi = require("tools-for-instagram");
const ipa = require("instagram-private-api");
const path = require("path");
const { readFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);

(async () => {
  let ig = await login();

  let picPath =
    "E:\\codes\\instagram-bot\\client\\123_ksihkays\\feeds\\photos\\lorem.jpg";

  const file = await readFileAsync(picPath);

  let published = await ig.publish.photo({ file: file, caption: "test brow" });

  const url = `https://www.instagram.com/p/${published.media.code}/`;

  console.log("done");
  console.log("Media id: " + url);
})();
