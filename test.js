const util = require("minecraft-server-util");

(async () => {
  const result = await util.status('play.xeonmine.me', {port: 25565});
  console.log(result);
})()