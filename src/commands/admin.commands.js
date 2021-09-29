const { MessageEmbed, Permissions } = require("discord.js");
const filtrarPrefix = require("../utils/filtrarPrefix");
const serverStatus = require("../utils/getServer");
const {
  getData,
  updateName,
  updateIp,
  updateVersion,
} = require("../utils/ServerData");

const commandsAdmin = async (client, message, id) => {
  const command = filtrarPrefix(message);

  if (command == "server") {
    const permiso = message.member.permissions.has(
      Permissions.FLAGS.ADMINISTRATOR
    );
    if (permiso) {
      const server = message.content.replace((/^(\w?\W)\w+/gi, ""));
      const res = await serverStatus(server);
      if (res === null) {
        const embed = new MessageEmbed()
          .setTitle(`Servidor: **${serverName}**`)
          .setDescription("El servidor se encuentra Offline")
          .setColor("RED")
          .setFooter(`XeonMine • ${message.author.username}`)
          .setTimestamp();
  
        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setColor("00CC19")
          .setTitle(`Servidor: **${serverName}**`)
          .setDescription(
            "Players: **" +
              res.onlinePlayers +
              "/" +
              res.maxPlayers +
              "**\n" +
              "El servidor se encuentra Online"
          )
          .setFooter(`XeonMine • ${message.author.username}`)
          .setTimestamp();
  
        message.channel.send({ embeds: [embed] });
      }
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
  const permiso = message.member.permissions.has(
    Permissions.FLAGS.ADMINISTRATOR
  );
  if (permiso) {
    if (command == encuestaCmd) {
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
        .setFooter(`XeonMine`);

      const msg = await message.channel.send({ embeds: [embed] });
      msg.react("👍");
      msg.react("👎");
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
