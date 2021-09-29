const Server = require("../models/Server");

const serverCtrl = {};

serverCtrl.getData = async (discordId) => {
  try {
    const serverData = await Server.findOne({ discordId });
    if (serverData) {
      return serverData;
    } else {
      return {
        serverName: "Server no definido",
        serverIP: ["no definido"],
        version: "no definido",
      };
    }
  } catch (error) {
    return {
      serverName: "Server no definido",
      serverIP: ["no definido"],
      version: "no definido",
    };
  }
};

const verifyAndSave = async (
  discordId,
  { serverName = null, serverIP = null, version = null }
) => {
  try {
    const data = await serverCtrl.getData(discordId);
    let server;
    if (data._id) {
      server = await Server.findByIdAndUpdate(data._id, {
        serverName: serverName ? serverName : data.serverName,
        serverIP: serverIP ? serverIP : data.serverIP,
        version: version ? version : data.version,
      });
    } else {
      server = new Server({
        discordId,
        serverName: serverName ? serverName : data.serverName,
        serverIP: serverIP ? serverIP : data.serverIP,
        version: version ? version : data.version,
      });
      await server.save();
    }
    return {
      message: "Servidor Actualizado",
      server: {
        discordId,
        serverName: serverName ? serverName : data.serverName,
        serverIP: serverIP ? serverIP : data.serverIP,
        version: version ? version : data.version,
      },
    };
  } catch (error) {
    return {
      message: "Error Servidor No Actualizado",
      server: { error: 502 },
    };
  }
};

serverCtrl.updateIp = (discordId, ip) => {
  const serverIP = ip
    .replace(/^(\w?\W)\w+/gi, "")
    .split(",")
    .map((e) => e.trim());
  return verifyAndSave(discordId, { serverIP });
};

serverCtrl.updateVersion = (discordId, serverVersion) => {
  const version = serverVersion.replace(/^(\w?\W)\w+/gi, "").trim();
  return verifyAndSave(discordId, { version });
};

serverCtrl.updateName = (discordId, serverNamed) => {
  const serverName = serverNamed.replace(/^(\w?\W)\w+/gi, "").trim();
  return verifyAndSave(discordId, { serverName });
};

module.exports = serverCtrl;
