const Discord = require("discord.js");
const walls = require("../walls.json");

exports.run = async (bot, message, args) => {
  message.delete
  let rwTime = walls[bot.user.username].wTime - 1;
  walls[bot.user.username].wTime -= rwTime
  let botEmbed = new Discord.RichEmbed()
  .setColor('#27ae60')
  .setDescription(`✅ Walls have been marked as clear by <@${message.author.id}>!`);
  message.channel.send(botEmbed)
}
	      
module.exports.help = {
  name: "clear"
}