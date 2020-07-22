const botconfig = require("./botconfig.json");
const walls = require("./walls.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});
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
	console.log(`Adsend function ran.`);
	let wCheckk = 4
	let wCheck = 1 * walls[bot.user.username].wTime;
	if (wCheck > wCheckk) {
		let wTime = 1 * walls[bot.user.username].wTime;  
	 	bot.guilds.filter(g => g.id === '553657927878180864').forEach(g => {
			let role = "Wall Checkers";
		 	let pRole = g.roles.find('name', role)
	 			bot.channels.filter(c => c.name === 'wall-check').forEach(channel => {
		 			if (channel.type == 'text') {
						channel.send("⌚ Time to Check walls! Time since last check: ${wTime} \n-[ ${pRole} ]\nMark with `..clear` or `..raid`");
					}
	 			});
	 	});
	}
	
 setTimeout(() => adSend(bot), 1*60000);
}

function timer(bot) {
	console.log(`+1`);
	walls[bot.user.username].wTime += 1
	
 setTimeout(() => timer(bot), 1*60000);
}

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.channels.filter(c => c.name === 'wall-check').forEach(channel => {
			if (channel.type == 'text') {
				channel.send("I have just restarted!");
		  }
		});
  
  if(!walls[bot.user.username]){
    walls[bot.user.username] = {
      wTime: 4
    };
  }
 
  bot.user.setGame(`..help | HBG's Wall Bot!`);
  adSend(bot)
  timer(bot)
  bot.channels.filter(c => c.name === 'wall-check').forEach(channel => {
	if (channel.type == 'text') {
		channel.send("⌚ Time to Check walls! Time since last check: **Bot Reboot**\nMark with `..clear` or `..raid`");
	}
  });
});

bot.on('guildCreate', guild => {
  bot.user.setGame(`..help | HBG's Wall Bot!`);
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
