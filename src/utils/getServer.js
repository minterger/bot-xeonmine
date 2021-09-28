const util = require("minecraft-server-util");

const serverStatus = async (serverip) => {
  try {
    const server = serverip.split(':')
    const ip = server[0]
    const port = server[1] ? parseInt(server[1]) : 25565; 

    return await util.status(ip, { port });
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = serverStatus;
