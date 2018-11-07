const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let slots = ["🍎",  "🍌", "🍒", "🍓", "🍈"];
  let result1 = Math.floor((Math.random() * slots.length));
  let result2 = Math.floor((Math.random() * slots.length));
  let result3 = Math.floor((Math.random() * slots.length));
  let name = message.author.displayName;
  let msg = await message.channel.send("**Slots Oynanılıyor...**");
  let aicon = message.author.displayAvatarURL;    
      if (slots[result1] === slots[result2] && slots[result3]){ 
      let wEmbed = new Discord.RichEmbed()
       .setFooter("Dinle ve Eğlen | dvebot.rf.gd > Kazandın!!",aicon)
       .setTitle(':slot_machine:Slots:slot_machine:')
       .addField('Sonuç:', slots[result1] + slots[result2] + slots[result3], true)
       .setColor("RANDOM");
      await message.channel.send(wEmbed);
       
          }else {
       
       let embed = new Discord.RichEmbed()
       .setFooter('Crew-Bot | cwbot.rf.gd > Kaybettin!',aicon)
       .setTitle(':slot_machine:Slots:slot_machine:')
       .addField('Sonuç', slots[result1] + slots[result2] + slots[result3], true)
       .setColor("RANDOM");
     await  message.channel.send(embed);
      
       }   
  if (slots[result1] ==  slots[result2] == slots[result1] && slots[result3] == slots[result1]){
    let embed = new Discord.RichEmbed()
       .setFooter('Crew-Bot | cwbot.rf.gd > Jackpotu kazandin!',aicon)
       .setTitle(':slot_machine:Slots:slot_machine:')
       .addField('Sonuç', slots[result1] + slots[result2] + slots[result3], true)
       .setColor("RANDOM");
     await  message.channel.send(embed);
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'slots',
  description: 'Sunucu hakkinda bilgi verir.',
  usage: 'sunucubilgi'
};