const ipa = require("instagram-private-api");
const tfi = require("tools-for-instagram");
const login = require("tools-for-instagram/src/login");

const clear = require("clear");
const chalk = require("chalk");
const path = require("path");

/* -- Modules -- */
const launchHeader = require("./module/header");
const getFilesFrom = require("./module/getFilesFrom");
const postStory = require("./module/postStory");
const postAlbum = require("./module/postAlbum");
const postPhotos = require("./module/postPhotos");
const checkInstagramData = require("./module/checkInstagramData");
const createConfig = require("./module/createConfig");

const init = require("./module/initialize");

(async () => {
  clear();
  await launchHeader();

  /* -- Check IG Credentials -- */
  await checkInstagramData();

  let ig = await login();

  let outputConfig = await createConfig();
  let config = outputConfig[0];
  let directory = await init(config);

  if (outputConfig[1] == false) {
    console.log(
      `Now you have created the directory at ${chalk.green(directory)}`
    );
    console.log(`Plz put the files into the corresponding folder :)`);
    console.log(
      `After you're done, press ${chalk.yellow(
        "CTRL + C"
      )} to end the program.\n`
    );
    console.log(
      `Then re-run it again using the ${chalk.magentaBright(
        "Publish existing PP"
      )} option`
    );
    return;
  }

  /*input file manually by user*/
  let feedsPhotos = await getFilesFrom(path.join(directory, "feeds", "photos"));
  let feedsVideos = await getFilesFrom(path.join(directory, "feeds", "videos"));
  let storiesPhotos = await getFilesFrom(
    path.join(directory, "stories", "photos")
  );
  let storiesVideos = await getFilesFrom(
    path.join(directory, "stories", "videos")
  );

  let data = {
    seller: config.seller,
    mention: config.mention,
    dir: directory,
    photos: feedsPhotos,
    videos: feedsVideos,
    stories: {
      photos: storiesPhotos,
      videos: storiesVideos,
    },
    caption: config.caption,
  };

  console.log(data);

  /* -- check if multiple post */
  if (data.photos.length + data.videos.length > 1) {
    try {
      await postAlbum(ig, data);
    } catch (error) {
      console.log(chalk.red(`Uh, oh..`));
      console.log(
        "Something's wrong with the postAlbum module, here's the error:"
      );
      console.log(error);
    }
  } else {
    try {
      await postPhotos(ig, data);
    } catch (error) {
      console.log(chalk.red(`Uh, oh..`));
      console.log(
        "Something's wrong with the postPhotos module, here's the error:"
      );
      console.log(error);
    }
  }

  /* -- check if there is story post */
  if (data.stories.photos.length || data.stories.videos.length) {
    try {
      await postStory(ig, data);
    } catch (error) {
      console.log(chalk.red(`Uh, oh..`));
      console.log(
        "Something's wrong with the postStory module, here's the error:"
      );
      console.log(error);

      console.log(
        `${chalk.blue(
          "psst... delete all generated files and try again, maybe you're lucky!"
        )}`
      );
    }
  }

  console.log(`${chalk.cyanBright("Program is (hopefully) finished!")}`);
})();
