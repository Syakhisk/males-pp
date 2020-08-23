const figlet = require("figlet");
const chalkAnimation = require("chalk-animation");
const title = require("../lib/title");
const chalk = require("chalk");
const delay = require("delay");

module.exports = async function launchHeader() {
  title();

  let intro = `Welcome to ${chalk.bold.red("Males-PP")} Instagram Bot`;
  let plain = "Welcome to Males-PP Instagram Bot";

  for (let i = 0; i < intro.length; i++) {
    process.stdout.write(intro[i]);
    await delay(20);
  }
  console.log();
  await delay(500);

  // console.log(`Welcome to ${chalk.bold.red("Males-PP")} Instagram Bot`);
  const glitch = chalkAnimation.glitch(`By Krozzle\n`);
  await delay(1100);
  glitch.stop();
  // setTimeout(() => {
  //   glitch.stop();
  // }, 2000);
};
