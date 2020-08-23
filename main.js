const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const server = http.createServer(app);

const moment = require("moment");
const schedule = require("node-schedule");

// const pp_all = require("./pp-all");
// const getFiles = require("./module/getFilesFrom");

app.get("/", (req, res) => {
  // let run = schedule.scheduleJob("*/1 * * * * *", (fireDate) => {
  //   res.send(`The program is run at ${fireDate}`);
  // });

  res.sendfile("index.html");
});

server.listen(port, () => {
  console.log("Server is running");
  console.log("lol");
});
