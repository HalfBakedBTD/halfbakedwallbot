const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let botEmbed = new Discord.RichEmbed()
  .setColor('#27ae60')
  .setDescription("Just do `..clear` to mark the walls as cleared and do `..raid` if a raid is in progress.");
  message.channel.send(botEmbed)
}
	      
module.exports.help = {
  name: "help"
}
