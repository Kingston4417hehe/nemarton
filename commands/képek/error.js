
const Discord = require('discord.js');

module.exports = {
  name: 'error',
  cooldown: 3,
run:  async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send('`Használat: (prefix)error <szöveg>`')
    }
    let erroMessage = args.slice(0).join(' ');
    if (erroMessage.length > 65) return message.channel.send('**Nem mehetsz 65 karakter felé!**');

    message.channel.send({ files: [{ attachment: `https://media.discordapp.net/attachments/919243851120652419/919526152840822794/unknown.png=${erroMessage}`, name: 'error.jpg' }] });
  }
}