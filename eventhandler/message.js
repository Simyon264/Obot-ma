try {
    const fs = require("fs");
    const colors = require("colours")
    const functions = require("../functions.js");
    const Discord = require('discord.js')
    const cooldowns = new Discord.Collection();

    module.exports = {
        run: function (client) {
            client.on('message', (message) => {
                try {
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
                        functions.embed(message.channel, "Ping-Pong!", colourInfo, "The bot prefix is `" + prefix + "`!")
                        return;
                    }
                    if (!message.guild) return;
                    if (message.author.bot) return;

                    var content = message.content;
                    if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
                        var FUCKING_WORK_AHHHHHH = false
                        client.guilds.fetch(message.guild.id).then((guild) => {
                            if (!guild.me.permissions.has("EMBED_LINKS")) {
                                if (guild.me.permissions.has("SEND_MESSAGES")) {
                                    message.channel.send("The bot is missing the `EMBED_LINKS` permission, the command will not execute.")
                                }
                                FUCKING_WORK_AHHHHHH = true
                            }
                            if (FUCKING_WORK_AHHHHHH) return;
                            var args = content.substring(prefix.length).split(" ");
                            fs.stat(`./commands/${args[0]}.js`, function (err, stat) {
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
                                                functions.embed(message.channel, "", colourWarn, `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`);
                                            }
                                        } else {
                                            timestamps.set(message.author.id, now);
                                            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                                            //perms check so you dont have to do it in the file lmao
                                            var cmdRoles = commandFile['perms'];
                                            if (cmdRoles !== "") {
                                                if (message.member.permissions.has(cmdRoles)) {
                                                    commandFile['run'](message, prefix, args, client)
                                                } else {
                                                    functions.embed(message.channel, "Error", colourWarn, "You are missing the permission: `" + cmdRoles + "`!")
                                                }
                                            } else {
                                                commandFile['run'](message, prefix, args, client)
                                            }
                                        }
                                    } catch (err) {
                                        functions.embed(message.channel, "", colourWarn, "An error occured!");
                                        //error logging
                                        const path = require('path');

                                        let date = new Date()

                                        let finnal = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getSeconds() + "_" + module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
                                        fs.writeFileSync(`./files/log/commandLogs/${finnal}.txt`, `Message: ${message.content}\n\nError: ` + err)
                                        console.log(colors.red(`An error occured! The error can be found in ./files/log/commandLogs/${finnal}.txt`))
                                    }
                                } else if (err.code === 'ENOENT') {
                                    var FUCKING_WORK_AHHHHHH = false
                                    client.guilds.fetch(message.guild.id).then((guild) => {
                                        if (!guild.me.permissions.has("EMBED_LINKS")) {
                                            FUCKING_WORK_AHHHHHH = true
                                        }
                                        if (FUCKING_WORK_AHHHHHH) return;
                                        functions.embed(message.channel, "", colourWarn, "Command does not exist");
                                    });
                                } else {
                                    console.log(err);
                                    functions.embed(message.channel, "", colourWarn, "An unexpected error has occured. Please contact the bot owner");
                                }
                            });
                        });
                    }
                } catch (error) {
                    const colors = require("colours")
                    const fs = require('fs')
                    const path = require('path');

                    let date = new Date()

                    let finnal = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getSeconds() + "_" + module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
                    //let finnal = `${date.getDate}_${date.getMonth}_${date.getFullYear}:${date.getSeconds}:${module.filename}.txt`
                    fs.writeFileSync(`./files/log/${finnal}.txt`, error)
                    console.log(colors.red(`An error occured! The error can be found in ./files/log/${finnal}.txt`))
                }

            });
        }
    }
} catch (error) {
    const colors = require("colours")
    const fs = require('fs')
    const path = require('path');

    let date = new Date()

    let finnal = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getSeconds() + "_" + module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
    //let finnal = `${date.getDate}_${date.getMonth}_${date.getFullYear}:${date.getSeconds}:${module.filename}.txt`
    fs.writeFileSync(`./files/log/${finnal}.txt`, error)
    console.log(colors.red(`An error occured! The error can be found in ./files/log/${finnal}.txt`))
}