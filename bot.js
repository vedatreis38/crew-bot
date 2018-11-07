const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { GOOGLE_API_KEY } = require('./ayarlar.json');
const YouTube = require('simple-youtube-api');
const superagent = require("superagent");
const chalk = require('chalk');
const fs = require('fs');
const weather = require('weather-js');
const snekfetch = require('snekfetch');
const hastebin = require('hastebin-gen');
const moment = require('moment');
const jsonfile = require('jsonfile');
require('./util/eventLoader')(client);

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

  client.GetSupportChannel = (member) => {
    return new Promise ((resolve,reject) => {
      try{
        let exists = fs.existsSync('./jsonlar/destek.json')
        if (exists) {
          obj = jsonfile.readFileSync('./jsonlar/destek.json')
          if (!obj[member.guild.id]) resolve(undefined);
          else resolve(obj[member.guild.id]);
        }
      } catch (ex) {
        console.error(ex);
        reject(ex)
      }
    })
  }

  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
      let props = require(`./komutlar/${f}`);
      log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });

  client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };

  client.load = command => {
    return new Promise((resolve, reject) => {
      try {
        let cmd = require(`./komutlar/${command}`);
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

    client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm");
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        dmchannel.sendMessage("", {embed: {
                color: 3447003,
                title: `Gönderen: ${message.author.tag}`,
                description: `Bota özelden gönderilen dm: ${message.content}`
              }})
    }
    if (message.channel.bot) return;
});

client.on("guildMemberAdd", async member => {
const kanal = member.guild.channels.find("name", "sohbet")
kanal.sendMessage(member + '  ' + member.guild.name + ' adlı sunucuya hoşgeldin! Seni görmek ne güzel.')
})

client.on('guildCreate', guild => {
  const owner = guild.owner
  const mrb = guild.systemChannel
  if (!mrb) return;
  let merhaba = new Discord.RichEmbed()
  .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
  .setAuthor(guild.name, guild.iconURL)
  .addField('**Crew-Bot sunucunuza eklendi!**', `${owner}`)
  .addField('**Crew-Bot** sunucunuzdaki insanlara kolaylıklar sağlar.', `**${prefix}bilgi** yazmanız yeterlidir!`)
  .addField('**Botumuzun özelliklerini öğrenmek için**', `**${prefix}yardım** yazmanız yeterlidir!`)
  .addField('Botumuzu eklemek istiyorsanız', `**${prefix}davet** yazarak ekleyebilirsiniz.`)
  mrb.send(merhaba);
});

client.on('guildCreate', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Bir Sunucuya Katıldım;')
  .setDescription(`Bot, 》${guild.name}《 adlı sunucuya katıldı [${guild.memberCount} Üye]!`)
  .setFooter('Crew-Bot', client.user.avatarURL)
  .setTimestamp()
  client.channels.get('461482059802607625').send(embed);
});

client.on('guildDelete', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Bir Sunucudan Ayrıldım;')
  .setDescription(`Bot, 》${guild.name}《 sunucudan ayrıldı [${guild.memberCount} Üye]!`)
  .setFooter('Crew-Bot', client.user.avatarURL)
  .setTimestamp()
  client.channels.get('461482059802607625').send(embed);
});

client.on('message', async msg => {

	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('** :mute:Müzik Çalmak İçin Bir Sesli Odaya Girmelisin**');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('**:mute:O Odaya Girme Yetkim Yok**');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('**:mute:Bu Odada Konuşma Yetkim Yok**');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`**✅ Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Müzik Seçim Listesi:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

**Lütfen 10 saniye içerisinde müzik seçimi yapınız yoksa seçiminiz iptal olucaktır. :warning: **

**1-10 arasındaki arama sonuçlarından birini seçmek için lütfen bir değer belirtin. :warning: **
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send(':x:** Bir sayı değeri seçilmediği için komut iptal edilmiştir.**');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(':x:**Youtubeda gene arama yaptım fakat ne yazikki bulamadım!**');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) return msg.channel.send('**:mute: Bu komutu kullanabilmek için bir sesli odada olman gerekli.**');
		if (!serverQueue) return msg.channel.send(':x: **Hiç bir müzik çalmamakta.**');
		serverQueue.connection.dispatcher.end('**Sıradaki müziğe geçildi.**');
		return undefined;
	} else if (command === 'dur') {
		if (!msg.member.voiceChannel) return msg.channel.send('**:mute: Bu komutu kullanabilmek için bir sesli odada olman gerekli.**');
		if (!serverQueue) return msg.channel.send(':x: **Hiç bir müzik çalmamakta.**');
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik bitti**');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) return msg.channel.send('**:mute: Bu komutu kullanabilmek için bir sesli odada olman gerekli.**');
		if (!serverQueue) return msg.channel.send(':x: **Hiç bir müzik çalmamakta.**');
		if (!args[1]) return msg.channel.send(`:loud_sound: Şuanki Ses Seviyesi: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`:loud_sound: Ses seviyesi ayarlanıyor: **${args[1]}**`);
	} else if (command === 'çalan') {
		if (!serverQueue) return msg.channel.send(':x: **Çalan müzik bulunmamakta**');
		return msg.channel.send(`🎶 Şuanda Çalan Müzik: **${serverQueue.songs[0].title}**`);
	} else if (command === 'kuyruk') {
		if (!serverQueue) return msg.channel.send(':x: **Çalan müzik bulunmamakta**');
		return msg.channel.send(`
__**Müzik Listesi:**__

**:warning: Lütfen 10 saniye içerisinde müzik seçimi yapınız yoksa seçiminiz iptal olucaktır! :warning: **

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Şuanda Çalan Müzik:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'duraklat') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('**⏸ Müzik başarılı bir şekilde durduruldu!**');
		}
		return msg.channel.send(':x: **Çalan müzik bulunmamakta**');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('**▶ Müzik başarılı bir şekilde devam ediyor!**');
		}
		return msg.channel.send(':x: Çalan müzik bulunmamakta.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: (video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:x: **Odaya Girememekteyim: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`:x: **Odaya Girememekteyim: ${error}**`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** Adlı müzik kuyruğa başarılı bir şekilde eklendi!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ':x: **Yayın akış hızı yeterli değil.**') console.log('Müzik bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 : **${song.title}** Adlı müzik başlıyor! :white_check_mark: `);
}

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.TOKEN);
