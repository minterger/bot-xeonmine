const Server = require("../models/Server");

const serverCtrl = {};

serverCtrl.getData = async (discordId) => {
  try {
    const serverData = await Server.find({ discordId });
    return serverData;
  } catch (error) {}
};

serverCtrl.updateIp = async (discordId, ip) => {
  try {
    const serverIP = ip
      .replace(/^(\w?\W)\w+/gi, "")
      .split(",")
      .map((e) => {
        e.trim();
      });
    const data = serverCtrl.getData(discordId);
    if (data) {
      await Server.findByIdAndUpdate(data._id, { serverIP });
    } else {
      const newServer = new Server({
        discordId,
        serverIP,
      });
      await newServer.save();
    }
  } catch (error) {}
};

module.exports = serverCtrl