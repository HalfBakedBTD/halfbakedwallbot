const botconfig = require("./botconfig.json");
const walls = require("./walls.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

function adSend(bot) {
	let wTime = 8 * walls[bot.user.username].wTime;
	 bot.channels.filter(c => c.name === 'wall-checks').forEach(channel => {
		 if (channel.type == 'text') {
				channel.send(`@Wall Checkers  it has been ${wTime} minutes since the last wall check!`);
			}
	 });
 setTimeout(() => adSend(bot), 8*60000);
}

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.channels.filter(c => c.name === 'wall-check').forEach(channel => {
			if (channel.type == 'text') {
				channel.send("❗ I have just restarted.");
		  }
		});
  
  if(!walls[bot.user.username]){
    walls[bot.user.username] = {
      wTime: 1
    };
  }
 
  bot.user.setGame(`..help | ..invite`);
	adSend(bot)
});

bot.on('guildCreate', guild => {
  bot.user.setGame(`..help | ..invite`);
});

bot.on("message", async message => {
 
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  
  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (!message.content.startsWith(`${prefix}`)) {
    return
  }
  
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  
});

bot.login(process.env.BOT_TOKEN);
