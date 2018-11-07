const Discord = require('discord.js');

exports.run = (client, message, params) => {
var embed = {
			color: 3447003,
			description: `**Bilgi**`,
			fields: [
				{
					name: '❯ Yapımcı',
					value: client.users.get('321285904503275521').tag,
					inline: false
				},
				{
					name: '❯ Sürüm',
					value: `Discord.JS:  v11.3.2
Bot:  v0.1.1`,
					inline: false
				},
				{
					name: '❯ Davet',
					value: `https://discordapp.com/oauth2/authorize?client_id=460723895268278283&scope=bot&permissions=2146958591`,
					inline: false
				},
				{
					name: '❯ Destek sunucusu',
					value: `https://discord.gg/9BYguVK`,
					inline: false
				},
			],
			footer: {
			  icon_url: client.user.avatarURL,
			  text: "© Crew-Bot | cwbot.rf.gd"
			},
			thumbnail: { url: client.user.avatarURL }
    };
		return message.channel.send({embed})};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};