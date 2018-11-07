const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("MÜZİK KOMUTLARI:",`
cw!çal:         ^Yazdığınız şarkıyı çalar.^
cw!kuyruk:      ^Şarkı kuyruğunu gösterir.^
cw!devam:       ^Duraklatılan şarkıya devam eder.^
cw!geç:         ^Çalan şarkıyı geçer.^
cw!dur:         ^Çalınan şarkıyı duraklatır.^
cw!çalan:       ^Mesajı yazdığınız anda hangi şarkının çaldığını gösterir.^
cw!duraklat:    ^Oynatılan şarkıyı duraklatır.^
cw!ses:         ^Oynatılan şarkının ses seviyesini ayarlar.^
cw!gir:         ^Bulunduğun kanala giriş yapar.^
cw!ayrıl:       ^Bulunduğun kanaldan çıkış yapar.^


* örn: cw!çal <şarkıismi>

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'müzik',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'müzik'
};