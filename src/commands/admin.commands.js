const { MessageEmbed, Permissions } = require("discord.js");
const filtrarPrefix = require("../utils/filtrarPrefix");
const serverStatus = require("../utils/getServer");
const {
  getData,
  updateName,
  updateIp,
  updateVersion,
  toggleRequest,
} = require("../utils/ServerData");

const commandsAdmin = async (client, message, id) => {
  const command = filtrarPrefix(message);

  if (command == "admincmds") {
    const embed = new MessageEmbed()
      .setTitle("COMANDOS ADMIN")
      .setColor("790ED7")
      .addFields(
        {
          name: "Prefixs",
          value: "**z!** o **!**",
        },
        {
          name: "Configurar Nombre",
          value: "setname **- configurar nombre del servidor de minecraft**",
        },
        {
          name: "Configurar IP",
          value:
            "setip **o** setips 'ip primaria', 'ip secundaria' **- configurar ip, mas de 1 separar por ','**",
        },
        {
          name: "Configurar Version",
          value: "setversion **- configurar version del servidor**",
        },
        {
          name: "Alternar Peticiones",
          value:
            "toggle **- Desactiva las peticiones para el comando players y status**",
        },
        {
          name: "Server Status Otros Servidores",
          value:
            "server 'ip' **- ver cantidad de usuarios y el estado de cualquier servidor**",
        },
        {
          name: "Anuncio",
          value: "anuncio **- crear un embed para anunciar en el servidor**",
        },
        {
          name: "Anuncio Importante",
          value:
            "imporntante **- crear un embed para anunciar con enfasis en el servidor**",
        },
        {
          name: "Encuesta",
          value: "encuesta **- crear encuesta de si o no**",
        },
        {
          name: "Ping",
          value:
            "ping **- ver la latencia del servidor del bot y la api de discord**",
        }
      )
      .setFooter(`TrinityMC • ${message.author.username}`)
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }

  if (command == "toggle") {
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );
    if (permiso) {
      const data = await toggleRequest(id);
      if (data.server.error) {
        return message.channel.send("error");
      }
      const embed = new MessageEmbed()
        .setTitle(data.message)
        .setColor("5b2c6f")
        .setDescription(
          `**Estado de peticiones:** ${
            data.server.toggle == true ? "activadas" : "desactivadas"
          }`
        );

      message.channel.send({ embeds: [embed] });
    } else {
      return;
    }
  }

  if (command == "resetlink") {
  }

  if (command == "addlink") {
  }

  if (command == "server") {
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );
    if (permiso) {
      const server = message.content.replace(/^(\w?\W)\w+/gi, "").trim();
      const res = await serverStatus(server);
      if (res === null) {
        const embed = new MessageEmbed()
          .setTitle(`Servidor: **'Error'**`)
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/1024px-Cross_red_circle.svg.png"
          )
          .setDescription("El servidor se encuentra Offline")
          .setColor("RED")
          .setFooter(`TrinityMC • ${message.author.username}`)
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      } else {
        const serverPort = res.port == 25565 ? "" : `:${res.port}`;
        const embed = new MessageEmbed()
          .setColor("00CC19")
          .setThumbnail(
            "https://www.freeiconspng.com/uploads/success-icon-10.png"
          )
          .setTitle(`Servidor: **${res.host}${serverPort}**`)
          .setDescription(
            "Players: **" +
              res.onlinePlayers +
              "/" +
              res.maxPlayers +
              "**\n" +
              "El servidor se encuentra Online"
          )
          .setFooter(`TrinityMC • ${message.author.username}`)
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      }
    } else {
      return;
    }
  }

  if (command == "setname") {
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );
    if (permiso) {
      const data = await updateName(id, message.content);
      if (data.server.error) {
        return message.channel.send("error");
      }
      const embed = new MessageEmbed()
        .setTitle(data.message)
        .setColor("5b2c6f")
        .setDescription(`**Server Name:** ${data.server.serverName}`);

      message.channel.send({ embeds: [embed] });
    } else {
      return;
    }
  }

  if (command == "setips" || command == "setip") {
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );
    if (permiso) {
      const data = await updateIp(id, message.content);
      if (data.server.error) {
        return message.channel.send("error");
      }
      let ips = "";
      data.server.serverIP.forEach((e) => {
        ips += `\`${e}\` `;
      });
      const embed = new MessageEmbed()
        .setTitle(data.message)
        .setColor("5b2c6f")
        .setDescription(`**IP:** ${ips}`);

      message.channel.send({ embeds: [embed] });
    } else {
      return;
    }
  }

  if (command == "setversion") {
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );
    if (permiso) {
      const data = await updateVersion(id, message.content);
      if (data.server.error) {
        return message.channel.send("error");
      }
      const embed = new MessageEmbed()
        .setTitle(data.message)
        .setColor("5b2c6f")
        .setDescription(`**Version:** ${data.server.version}`);

      message.channel.send({ embeds: [embed] });
    } else {
      return;
    }
  }

  // Bot habla con vos
  const sayCmd = "say";
  if (command == sayCmd) {
    const regex = new RegExp(`^(\\w?\\W)?\\w+\\s`, "gi");
    const msg = message.content.replace(regex, "");
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );

    if (permiso) {
      try {
        await message.delete();
        message.channel.send(msg);
      } catch (error) {
        message.channel.send("Necesito permisos de moderador para hacer esto");
      }
    } else {
      return;
    }
  }

  // comando para hacer anuncios
  const anuncioCmd = "anuncio";
  if (command == anuncioCmd) {
    const regex = new RegExp(`^(\\w?\\W)?\\w+\\s`, "gi");
    const anuncio = message.content.replace(regex, "");

    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );

    const embed = new MessageEmbed()
      .setTitle("Anuncio")
      .setColor("5b2c6f")
      .setDescription(anuncio)
      .setFields({
        name: "Tags:",
        value: "||@here @everyone||",
      });

    if (permiso) {
      try {
        await message.delete();
        message.channel.send({ embeds: [embed] });
      } catch (error) {
        message.channel.send("Necesito permisos de moderador para hacer esto");
      }
    } else {
      return;
    }
  }

  const anuncioImportant = "importante";
  if (command == anuncioImportant) {
    const regex = new RegExp(`^(\\w?\\W)?\\w+\\s`, "gi");
    const anuncio = message.content.replace(regex, "");

    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );

    const embed = new MessageEmbed()
      .setTitle("Anuncio Importante!")
      .setColor("e74c3c")
      .setDescription(anuncio)
      .setFields({
        name: "Tags:",
        value: "||@here @everyone||",
      });

    if (permiso) {
      try {
        await message.delete();
        message.channel.send({ embeds: [embed] });
      } catch (error) {
        message.channel.send("Necesito permisos de moderador para hacer esto");
      }
    } else {
      return;
    }
  }

  // comando para hacer encuestas
  let encuestaCmd = "encuesta";
  if (command == encuestaCmd) {
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );
    if (permiso) {
      const regex = new RegExp(`^(\\w?\\W)?${encuestaCmd}\\s`, "gi");

      const encuesta = message.content.replace(regex, "") + "\n";

      const embed = new MessageEmbed()
        .setTitle("Encuesta")
        .setColor("RANDOM")
        .setDescription(encuesta)
        .setFields(
          {
            name: "Opcion 1:",
            value: "👍 Si",
            inline: true,
          },
          {
            name: "Opcion 2:",
            value: "👎 No",
            inline: true,
          }
        )
        .setFooter(`TrinityMC`);

      const msg = await message.channel.send({ embeds: [embed] });
      msg.react("👍");
      msg.react("👎");
    } else {
      return;
    }
  }

  // comando ping
  if (command == "ping") {
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );
    if (permiso) {
      const msg = await message.channel.send("Loading data");
      msg.delete();
      const embed = new MessageEmbed()
        .setTitle("Ping")
        .setDescription(
          `🏓Mensaje: **${
            msg.createdTimestamp - message.createdTimestamp
          }**ms. API: **${Math.round(client.ws.ping)}**ms`
        );
      message.channel.send({ embeds: [embed] });
    } else {
      return;
    }
  }
};

module.exports = commandsAdmin;
