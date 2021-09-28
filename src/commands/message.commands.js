const { MessageEmbed, Permissions } = require("discord.js");
const filtrarPrefix = require("../utils/filtrarPrefix");
const server = require("../utils/getServer");

const commands = async (message) => {
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
    const embed = new MessageEmbed()
      .setTitle("XeonMine Server")
      .setColor("00CC19")
      .setFields(
        {
          name: "IP Primaria:",
          value: "`play.xeonmine.me`",
        },
        {
          name: "IP Secundaria:",
          value: "`xms.minecraft.casa`",
        },
        {
          name: "Version:",
          value: "1.9 - 1.17.1",
        }
      )
      .setFooter(`XeonMine • ${message.author.username}`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  // estado del servidor
  if (command == "status") {
    const res = await server();
    if (res === null) {
      const embed = new MessageEmbed()
        .setTitle("Servidor: **play.xeonmine.me**")
        .setDescription("El servidor se encuentra Offline")
        .setColor("RED")
        .setFooter(`XeonMine • ${message.author.username}`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor("00CC19")
        .setTitle("Servidor: **play.xeonmine.me**")
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

  // jugadores conectados al servidor
  if (command == "players") {
    const res = await server();
    if (res === null) {
      const embed = new MessageEmbed()
        .setTitle("Servidor: **play.xeonmine.me**")
        .setDescription("El servidor se encuentra Offline")
        .setColor("RED")
        .setFooter(`XeonMine • ${message.author.username}`)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      let players =
        res.samplePlayers === null
          ? null
          : res.samplePlayers.map((item) => {
              return `Nick: **${item.name}**`;
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

  // Bot habla con vos
  const sayCmd = "say";
  if (command == sayCmd) {
    const regex = new RegExp(`^(\\w?\\W)?${sayCmd}\\s`, "gi");
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
    }
    return;
  }

  // comando para hacer anuncios
  const anuncioCmd = "anuncio";
  if (command == anuncioCmd) {
    const regex = new RegExp(`^(\\w?\\W)?${anuncioCmd}\\s`, "gi");
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
    const regex = new RegExp(`^(\\w?\\W)?${anuncioImportant}\\s`, "gi");
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

module.exports = commands;
