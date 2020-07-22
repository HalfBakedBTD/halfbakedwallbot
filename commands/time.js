const Discord = require("discord.js");
const walls = require("../walls.json");

exports.run = async (bot, message, args) => {
  message.delete
  let rwTime = walls[bot.user.username].wTime;
  let botEmbed = new Discord.RichEmbed()
  .setColor('#27ae60')
  .setDescription(`Walls have not been checked in **${rwTime}** mins.`);
  message.channel.send(botEmbed)
}
	      
module.exports.help = {
  name: "time"
}
