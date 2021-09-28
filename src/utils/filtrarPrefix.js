const filtrar = (message) => {
  const prefix1 = "z!";
  const prefix2 = "!";

  if (message.channel.type === "DM") return;
  if (message.author.bot) return;
  // if (!message.content.startsWith(prefix)) return;

  // filtrar prefix
  let args;
  if (message.content.startsWith(prefix1)) {
    //prefix1 z!
    args = message.content.slice(prefix1.length).trim().split(/ +/g);
  } else if (message.content.startsWith(prefix2)) {
    //prefix2 !
    args = message.content.slice(prefix2.length).trim().split(/ +/g);
  } else {
    return;
  }
  return args.shift().toLowerCase();
};

module.exports = filtrar;
