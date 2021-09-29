const { Client, Intents } = require("discord.js");
const commandsAdmin = require("./commands/admin.commands");
const commandsUser = require('./commands/message.commands')

require("dotenv").config();
require("./database");

const token = process.env.TOKEN;

const intents = new Intents(32767);

// Create a new client instance
const client = new Client({ intents });

client.on("messageCreate", async (message) => {
  commandsUser(client, message, message.guild.id);
  commandsAdmin(client, message, message.guild.id)
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  const estados = [
    {
      name: "Help: z!help",
      type: "WATCHING",
    },
    {
      name: "Prefix: z! o !",
      type: "WATCHING",
    },
  ];

  const precence = () => {
    client.user.setPresence({
      activities: [estados[i]],
      status: "online",
    });
  };

  const randomNum = () => {
    return parseInt(Math.random() * (estados.length - 0) + 0);
  };

  let i = 0;

  setInterval(() => {
    precence();
    let num = i;
    let boolean = true;
    while (boolean) {
      if (i === num) {
        num = randomNum();
      } else {
        i = num;
        boolean = false;
      }
    }
  }, 10000);

  console.log("Listo para usar!");
});

// Login to Discord with your client's token
client.login(token);
