require("tools-for-instagram");

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const login = require("tools-for-instagram/src/login");
const getFilesFrom = require("./module/getFilesFrom");
const postStory = require("./module/postStory");

const readDirAsync = promisify(fs.readdir);

(async () => {
  console.log("\n -- Logging In From Cookies --\n".bold.underline);

  const cookies = await readDirAsync(path.join(__dirname, "cookies"));
  const usernames = cookies.map((username) => {
    return username.replace(".json", "");
  });

  let igs = [];
  for (user of usernames) {
    console.log(`Iterating cookies...`);

    let ig = await login({
      inputLogin: user,
      inputPassword: "",
      onlineMode: false,
    });

    igs.push(ig);
  }
  const directory =
    "e:\\codes\\pp-production-ready\\males-pp\\client\\ksihkays";

  let feedsPhotos = await getFilesFrom(path.join(directory, "feeds", "photos"));
  let feedsVideos = await getFilesFrom(path.join(directory, "feeds", "videos"));
  let storiesPhotos = await getFilesFrom(
    path.join(directory, "stories", "photos")
  );
  let storiesVideos = await getFilesFrom(
    path.join(directory, "stories", "videos")
  );

  let data = {
    seller: "syakhisk",
    mention: "syakhisk",
    dir: directory,
    photos: feedsPhotos,
    videos: feedsVideos,
    stories: {
      photos: storiesPhotos,
      videos: storiesVideos,
    },
    caption: "test",
  };

  // console.log("data:", data);
  for (theIG of igs) {
    await postStory(theIG, data);
  }

  console.log("\nProcess done!\n".green);
  // console.log(igs);
})();
