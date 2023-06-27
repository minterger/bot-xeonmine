const { MessageEmbed, Permissions } = require("discord.js");
const filtrarPrefix = require("../utils/filtrarPrefix");
const serverStatus = require("../utils/getServer");
const { getData } = require("../utils/ServerData");

const commandsUser = async (client, message, id) => {
  const command = filtrarPrefix(message);

  // comando para ver los comandos
  if (command == "help" || command == "comandos") {
    const embed = new MessageEmbed()
      .setTitle("COMANDOS")
      .setColor("790ED7")
      .addFields(
        {
          name: "Prefixs",
          value: "**z!** o **!**",
        },
        {
          name: "Help",
          value: "help **o** comandos **- muestra este mensaje**",
        },
        {
          name: "Comandos Admin",
          value: "admincmds **muestra los comandos para administradores**",
        },
        {
          name: "Mostrar IP",
          value: "ip **- ver la ip y version del servidor de minecraft**",
        },
        {
          name: "Server Status",
          value:
            "status **- ver cantidad de usuarios y el estado del servidor**",
        },
        {
          name: "Players Online",
          value:
            "players **- ver el nick de los jugadores conectados al servidor**",
        }
      )
      .setFooter(`XeonMine • ${message.author.username}`)
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }

  //ip del servidor
  if (command == "ip") {
    //datos database
    const data = await getData(id);
    const serverName = data.serverName;
    const serverVersion = data.version;
    const serverIps = data.serverIP;

    const res = await serverStatus(serverIps[0]);

    //ordenar ip en fields
    const fields = serverIps.map((ip, i) => {
      return {
        name: `Ip ${i == 0 ? "Primaria" : "Repuesto"}`,
        value: `\`${ip}\``,
      };
    });

    //sumar version a los fields
    fields.push({
      name: "Version:",
      value: serverVersion,
    });

    const embed = new MessageEmbed()
      .setTitle(serverName)
      .setColor("00CC19")
      .setFooter(`XeonMine • ${message.author.username}`)
      .setTimestamp();

    // incrustar ips en embed
    embed.fields = fields;

    message.channel.send({ embeds: [embed] });
  }

  // estado del servidor
  if (command == "status") {
    const data = await getData(id);
    const requests = data.toggle;
    const serverName = data.serverName;
    const serverIps = data.serverIP;

    if (!requests) {
      const embed = new MessageEmbed()
        .setTitle("Peticiones")
        .setColor("C70039")
        .setDescription(
          `**Estado de peticiones:** desactivadas por administrador`
        );

      return message.channel.send({ embeds: [embed] });
    }

    //get server statuas
    const res = await serverStatus(serverIps[0]);

    if (res === null) {
      const embed = new MessageEmbed()
        .setTitle(`Servidor: **${serverName}**`)
        .setThumbnail(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/1024px-Cross_red_circle.svg.png"
        )
        .setDescription("El servidor se encuentra Offline")
        .setColor("RED")
        .setFooter(`XeonMine • ${message.author.username}`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor("00CC19")
        .setThumbnail(
          "https://www.freeiconspng.com/uploads/success-icon-10.png"
        )
        .setTitle(`Servidor: **${serverName}**`)
        .setDescription(
          "Players: **" +
            res.players.online +
            "/" +
            res.players.max +
            "**\n" +
            "El servidor se encuentra Online"
        )
        .setFooter(`XeonMine • ${message.author.username}`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }
  }

  // jugadores conectados al servidor
  if (command == "players") {
    const data = await getData(id);
    const requests = data.toggle;
    const serverName = data.serverName;
    const serverIps = data.serverIP;

    if (!requests) {
      const embed = new MessageEmbed()
        .setTitle("Peticiones")
        .setColor("C70039")
        .setDescription(
          `**Estado de peticiones:** desactivadas por administrador`
        );

      return message.channel.send({ embeds: [embed] });
    }

    const res = await serverStatus(serverIps[0]);
    if (res === null) {
      const embed = new MessageEmbed()
        .setTitle(`Servidor: **${serverName}**`)
        .setThumbnail(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/1024px-Cross_red_circle.svg.png"
        )
        .setDescription("El servidor se encuentra Offline")
        .setColor("RED")
        .setFooter(`XeonMine • ${message.author.username}`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      let players = !res.players?.list
        ? null
        : res.players.list.map((item) => {
            return `Nick: **${item.name_clean}**`;
          });

      players =
        players === null
          ? "No hay jugadores activos"
          : players.toString().replace(/,/g, "\n");

      const embed = new MessageEmbed()
        .setTitle("Players Online")
        .setColor("RANDOM")
        .setDescription(players)
        .setFooter(`XeonMine • ${message.author.username}`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }
  }
};

module.exports = commandsUser;
