const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let botEmbed = new Discord.RichEmbed()
  .setColor('#27ae60')
  .setDescription("Do `..clear` to mark the walls as cleared.");
  message.channel.send(botEmbed)
}
	      
module.exports.help = {
  name: "help"
}
