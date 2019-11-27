const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let botEmbed = new Discord.RichEmbed()
  .setColor('#27ae60')
  .setDescription("At least I work right?/n[invite](https://discordapp.com/oauth2/authorize?client_id=649394319148449795&permissions=8&scope=bot)");
  message.channel.send(botEmbed)
}
	      
module.exports.help = {
  name: "help"
}
