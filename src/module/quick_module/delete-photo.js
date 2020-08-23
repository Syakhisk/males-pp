const tfi = require("tools-for-instagram");
const ipa = require("instagram-private-api");
const path = require("path");
const { readFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);

(async () => {
  let ig = await login();

  let media_id = "2378414090164781998_28196870663";

  await ig.media.delete({ mediaId: media_id, mediaType: "CAROUSEL" });

  console.log("done");
})();
