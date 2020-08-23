const moment = require("moment");
const schedule = require("node-schedule");

// const pp_all = require("./pp-all");
// const getFiles = require("./module/getFilesFrom");

schedule.scheduleJob("*/1 * * * * *", function () {
  console.log(`The program is run at ${"asd"}`);
});
