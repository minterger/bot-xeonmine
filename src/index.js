// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const util = require("minecraft-server-util");
require("dotenv").config();

const token = process.env.TOKEN;

const intents = new Intents(32767);

// Create a new client instance
const client = new Client({ intents });

const server = async () => {
  return await util.status("play.xeonmine.me", { port: 25565 });
};

client.on("messageCreate", async (message) => {
  const prefix = "z!";

  if (message.channel.type === "DM") return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "ip") {
    message.reply("Ip: **play.xeonmine.me**\n" + "Version: **1.9 - 1.17.1**");
  }

  if (command == "mcstatus") {
    const res = await server();
    if (res.errno) {
      message.reply(
        "Servidor: **play.xeonmine.me**\n" + "El servidor se encuentra Offline"
      );
    } else {
      message.reply(
        "Servidor: **play.xeonmine.me**\n" +
          "Players: **" +
          res.onlinePlayers +
          "/" +
          res.maxPlayers +
          "**\n" +
          "El servidor se encuentra Online"
      );
    }
  }

  if (command == "players") {
    const res = await server();
    if (res.errno) {
      message.reply(
        "Servidor: **play.xeonmine.me**\n" + "El servidor se encuentra Offline"
      );
    } else {
      let players = res.samplePlayers.map((item) => {
        return `Nick: **${item.name}**`;
      });

      players = players.toString().replace(/,/g, "\n");

      message.reply(
        "Players Online:\n" +
        "―――――――――\n" +
        players + '\n' +
        "―――――――――"
      );
    }
  }
});
// When the client is ready, run this code (only once)
client.once("ready", () => {
  const estados = [
    {
      name: "play.xeonmine.ga",
      type: "PLAYING",
    },
    {
      name: "1.9 - 1.17.1",
      type: "PLAYING",
    },
    {
      name: "Mostrar IP: z!ip",
      type: "WATCHING",
    },
  ];

  let i = 0;
  const precence = () => {
    client.user.setPresence({
      activities: [estados[i]],
      status: "online",
    });
  };

  setInterval(() => {
    precence();
    i = i === 2 ? 0 : i + 1;
  }, 10000);

  console.log("Ready!");
});

// Login to Discord with your client's token
client.login(token);
