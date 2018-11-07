const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
 setInterval(function() {
    setTimeout(() => {  
client.channels.get("461801812434092032").setName(`Kanal: ${client.channels.size}`)  
    }, 1000);

}, 8000);
setInterval(function() {
    setTimeout(() => {  
client.channels.get("461801825839087617").setName(`Kullanıcı: ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`) 
    }, 1000);

}, 8000);


setInterval(function() {
setTimeout(() => {  
client.channels.get("461801837033553921").setName(`Sunucu: ${client.guilds.size}`)  
}, 1000);

}, 8000);
client.user.setPresence({
        game: {
            name: `dve!yardım - dve!davet | ${client.guilds.size} sunucu | dvebot.rf.gd`,
            type: 'PLAYING'
        },
        status: 'dnd'
    })

    console.log(`Giriş Yapıldı!`);
  console.log(client.channels.size + ` Kanal - ` + client.guilds.size + ` Sunucu - ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` Kullanıcı`); 
}