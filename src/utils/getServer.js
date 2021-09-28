const util = require("minecraft-server-util");

const serverStatus = async () => {
  try {
    return await util.status("play.xeonmine.me", { port: 25565 });
  } catch (error) {
    return null;
  }
};

module.exports = server;
