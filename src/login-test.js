const ipa = require("instagram-private-api");
const tfi = require("tools-for-instagram");
const login = require("tools-for-instagram/src/login");

(async () => {
  const ig = await login({
    inputLogin: "jeje.cy",
    inputPassword: "",
    onlineMode: false,
  });
  const ig2 = await login({
    inputLogin: "ksihkays",
    inputPassword: "",
    onlineMode: false,
  });
})();
