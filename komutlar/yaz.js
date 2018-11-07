const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Botun yazacağı bir mesaj yaz');
  message.delete();
    if (message.channel.type !== "group") {
      const kullanicibilgimk = new Discord.RichEmbed()
      .setAuthor(message.author.username + '#' + message.author.discriminator, message.author.avatarURL)
      .setColor("RANDOM")
      .setDescription('**' + mesaj + '**')

      console.log("cw!yaz komutu " + message.author.username + '#' + message.author.discriminator + " tarafından kullanıldı.")
      return message.channel.sendEmbed(kullanicibilgimk);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yaz'],
  permLevel: 0
};

exports.help = {
  name: 'yaz',
  description: 'İstediğiniz şeyi bota yazdırır.',
  usage: 'cw!yaz [yazdırmak istediğiniz şey]'
};
