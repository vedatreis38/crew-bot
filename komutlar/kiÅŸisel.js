const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("KULLANICI KOMUTLARI:",`
cw!afk:         ^Afk moduna geçersiniz.^
cw!bilgi:       ^Bot hakkında bilgiler alırsınız.^
cw!davet:       ^Botun davet linkini gönderir.^
cw!destek:      ^Botun destek sunucusunu yollar.^
cw!geldim:      ^Afk modundan çıkmanızı sağlar.^
cw!istatistik:  ^Botun istatistiklerini atar.^
cw!kullanıcı:   ^Yazan kullanıcının hakkında bilgiler verir.^
cw!ping:        ^Botun pingini gösterir.^
cw!sunucu:      ^Sunucu hakkında bilgiler verir.^
cw!hatabildir:  ^Botta bulunan bir hatayı göndermenizi sağlar.^
cw!yardım:      ^Yardım komutlarını gösterir.^

* örn: cw!afk <sebep>

`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kişisel',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'kişisel'
};