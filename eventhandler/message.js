const fs = require("fs");
const colors = require("colours")
const functions = require("../functions.js");
const Discord = require('discord.js')
const cooldowns = new Discord.Collection();

module.exports = {
    run: function(client) {
        client.on('message', (message) => {
            var colourInfo = functions.config().messageColours.info;
            var colourWarn = functions.config().messageColours.warn;
            
            //If the guild config file is there
            try {
                fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`)
            } catch (error) {
                console.log(colors.red(`Error: Guild config file for ` + colors.yellow(`${message.guild.name}`) + colors.red(` is missing, creating file...`)))
                fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(JSON.parse(fs.readFileSync("./files/serverConfigs/template.json"))))
                console.log(colors.green(`Success: Guild config file for ${colors.yellow(`${message.guild.name}`)}` + colors.green(` was written!`)))
            }
            //defining the prefix after config check so i dont try to get something from a file that may not even be there
            var prefix = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`)).prefix;
            if (client.user == message.mentions.users.first()) {
                functions.embed(message.channel,"Ping-Pong!",colourInfo,"The bot prefix is `" + prefix + "`!")
                return;
            }
            if (!message.guild) return;
            var content = message.content;
            if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
                var args = content.substring(prefix.length).split(" ");
                fs.stat(`./commands/${args[0]}.js`, function(err, stat) {
                    if (err == null) {
                        try {
                            var commandFile = require(`../commands/${args[0]}`);
                            let commandName = commandFile['name']
                            let comandCooldown = commandFile['cooldown']
                            if (!cooldowns.has(commandName)) {
	                            cooldowns.set(commandName, new Discord.Collection());
                            }
                            const now = Date.now();
                            const timestamps = cooldowns.get(commandName);
                            const cooldownAmount = (comandCooldown || 3) * 1000;
                            if (timestamps.has(message.author.id)) {
                                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;    
                                if (now < expirationTime) {
		                            const timeLeft = (expirationTime - now) / 1000;
		                            functions.embed(message.channel,"",colourWarn,`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`);
	                            }
                            } else {
                                timestamps.set(message.author.id, now);
                                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                                //perms check so you dont have to do it in the file lmao
                                var cmdRoles = commandFile['perms'];
                                if (cmdRoles !== "") {
                                    if (message.member.permissions.has(cmdRoles)) {
                                        commandFile['run'](message, prefix, args, client);
                                    } else {
                                        functions.embed(message.channel,"Error",colourWarn,"You are missing the permission: `" + cmdRoles + "`!")
                                    }
                                } else {
                                    commandFile['run'](message, prefix, args, client);
                                }
                            }
                        } catch (err) {
                            console.log(`${message.content}`);
                            console.log(err);

                            functions.embed(message.channel, "", colourWarn, "An error occured!");   
                        }
                    } else if (err.code === 'ENOENT') {
                        functions.embed(message.channel, "", colourWarn, "Command does not exist");
                    } else {
                        console.log(err);
                        functions.embed(message.channel, "", colourWarn, "An unexpected error has occured. Please contact the bot owner");   
                    }
                });
            }
        });
    }
}