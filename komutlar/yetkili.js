const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("YETKİLİ KOMUTLARI:",`
cw!ban:         ^Belirlediğiniz bir kullanıcıyı sunucudan kalıcı olarak atarsınız.^
cw!kur:         ^Bot için gerekli odaları kurar.^
cw!oylama:      ^Standart bir oylama yapmanızı sağlar.^
cw!reboot:      ^Botu yeniden yapmanızı sağlar.^
cw!sunucular:   ^Botun bulunduğu sunucuları gösterir.^
cw!tavsiye:     ^Bot'a tavsiye yollamanızı sağlar.^
cw!yaz:         ^Bot üzerinden yazı yazmanızı sağlar.^
cw!kilit:       ^Kanalı belirli bir süre kilitlemenizi sağlar.^

* örn: cw!ban <sebep>

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'yetkili'
};