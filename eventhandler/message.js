// Imports
const fs = require("fs");
const colors = require("colours")
const functions = require("../functions.js");
const Discord = require('discord.js')
const path = require('path');
const cooldowns = new Discord.Collection();

function error_handler(err, type, message) {
    message = (typeof message === 'undefined') ? '' : message; // Defaults to blank in no message parameter is passed
    let error = `${type}\n\n${message}\n\n${err}\n\n${err.stack}`
    let date = new Date()
    let iso_date = date.toISOString()
    let log_filename = `${iso_date}_${module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3)}`

    fs.writeFileSync(`./files/log/${log_filename}.txt`, error)
    console.log(colors.red(`An error occured! The error can be found in /files/log/${log_filename}.txt`))
}

module.exports = {
    run: function (client) {
        const colourInfo = functions.config().messageColours.info;
        const colourWarn = functions.config().messageColours.warn;
        client.on('message', (message) => {
            try {
                if (!message.guild) return; // Check if a message is a guild, and ignores it
                if (message.author.bot) return; // Check if message is from a bot, and ignores it

                //Read the server config file, and if it's missing, create one.
                let guildConfig;
                try {
                    guildConfig = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`, "utf-8"))
                } catch (err) {
                    console.log(`${colors.red('Error: Guild config file for')} ${colors.yellow(message.guild.name)} ${colors.red('is missing, creating file...')}`)
                    let serverConfigTemplate = fs.readFileSync("./files/serverConfigs/template.json", "utf-8")
                    fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, serverConfigTemplate)
                    console.log(`${colors.green('Success: Guild config file for')} ${colors.yellow(message.guild.name)} ${colors.green('was written!')}`)
                }

                // If the bot if pinged, respond with the server prefix, according to the server config
                let prefix = guildConfig.prefix;
                let blockedUsers = guildConfig.blockedUsers
                if (client.user == message.mentions.users.first()) {
                    if (typeof blockedUsers !== 'undefined') {
                        for (let i = 0; i < blockedUsers.length; i++) {
                            if (blockedUsers[i].id == message.author.id) return; // Don't send a repsonse
                        }
                    }
                    functions.embed(message.channel, "Hey!", colourInfo, `My prefix is **${prefix}**`)
                    return;
                }

                const content = message.content;

                // Respond to messages containing "rigged"
                if (content.includes("rigged")) {
                    let randomNumber = functions.randomInt(1, 200)
                    if (randomNumber == 69) {
                        message.channel.send("its rigged")
                    } else {
                        message.channel.send("its not rigged")
                    }
                }

                // Check if prefix matches one in guild config
                if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
                    let args = content.substring(prefix.length).split(" ");
                    fs.stat(`./commands/${args[0]}.js`, function (err, stat) {
                        // Look for the command file using the name of the command
                        if (!err) {
                            try {
                                const commandFile = require(`../commands/${args[0]}`);
                                const commandName = commandFile['name']
                                const isMod = commandFile['modcommand']
                                const comandCooldown = commandFile['cooldown']

                                if (!cooldowns.has(commandName)) {
                                    cooldowns.set(commandName, new Discord.Collection());
                                }

                                const now = Date.now();
                                const timestamps = cooldowns.get(commandName);
                                const cooldownAmount = (comandCooldown || 3) * 1000; // Use comand cooldown, or default to 3 seconds, and then convert it to milliseconds
                                
                                // Check if user is on the cooldown list
                                if (timestamps.has(message.author.id)) {
                                    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                                    if (now < expirationTime) {
                                        const timeLeft = (expirationTime - now) / 1000;
                                        message.channel.send(`You're using **${commandName}** too quickly. Wait another ${timeLeft.toFixed(1)} seconds to use this command again.`)
                                    }
                                } else { // Run the command
                                    timestamps.set(message.author.id, now);
                                    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

                                    // Check if the user is blocked
                                    if (guildConfig.blockedUsers) {
                                        let blockCMD = commandFile['blockCMD']
                                        let blockedUsers = guildConfig.blockedUsers
                                        for (let i = 0; i < blockedUsers.length; index++) {
                                            if (blockedUsers[i].id == message.author.id) {
                                                if (!blockCMD) return; // If the command is not suppossed to be executed when a user is blocked, sned no repsonse
                                            }
                                        }
                                    }

                                    // Check if the member sending the message has appropiate permissions to run a command
                                    let commandPermissions = commandFile['perms'];
                                    if (commandPermissions) {
                                        if (message.member.permissions.has(commandPermissions)) {
                                            if (guildConfig.bot != message.channel.id && !isMod) return; // If the command is requested outside the command channel and is not a moderation command, send no response
                                            commandFile['run'](message, prefix, args, client)
                                        } else {
                                            functions.embed(message.channel, "Error", colourWarn, `You are missing the permission: ${commandPermissions}`)
                                        }
                                    } else {
                                        if (functions.getServerConfig(message.guild.id).bot != message.channel.id && !isMod) return;
                                        commandFile['run'](message, prefix, args, client)
                                    }
                                }
                            } catch (err) {
                                functions.embed(message.channel, "", colourWarn, "An error occured!");
                                error_handler(err, "Command Error!", `Message: ${message.content}`)
                            }
                        } else if (err.code === 'ENOENT') { // If the command couldn't be found by it's name, use aliases
                            // I just copy pasted this code because I was tired. Sorry - Joshua
                            try {
                                let dir = fs.readdirSync("./commands/")
                                let commandFile
                                let found = false
                                for (let i = 0; i < dir.length; i++) {
                                    commandFile = require(`../commands/${dir[i]}`);
                                    if (commandFile['alias'].includes(args[0].toLowerCase())) {
                                        found = true;
                                        final = i
                                        i = dir.length;
                                    }
                                }
                                if (found) {
                                    try {
                                        const commandFile = require(`../commands/${dir[final]}`);
                                        const commandName = commandFile['name']
                                        const isMod = commandFile['modcommand']
                                        const comandCooldown = commandFile['cooldown']

                                        if (!cooldowns.has(commandName)) {
                                            cooldowns.set(commandName, new Discord.Collection());
                                        }

                                        const now = Date.now();
                                        const timestamps = cooldowns.get(commandName);
                                        const cooldownAmount = (comandCooldown || 3) * 1000; // Use comand cooldown, or default to 3 seconds, and then convert it to milliseconds
                                        
                                        // Check if user is on the cooldown list
                                        if (timestamps.has(message.author.id)) {
                                            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                                            if (now < expirationTime) {
                                                const timeLeft = (expirationTime - now) / 1000;
                                                message.channel.send(`You're using **${commandName}** too quickly. Wait another ${timeLeft.toFixed(1)} seconds to use this command again.`)
                                            }
                                        } else { // Run the command
                                            timestamps.set(message.author.id, now);
                                            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

                                            // Check if the user is blocked
                                            if (guildConfig.blockedUsers) {
                                                let blockCMD = commandFile['blockCMD']
                                                let blockedUsers = guildConfig.blockedUsers
                                                for (let i = 0; i < blockedUsers.length; index++) {
                                                    if (blockedUsers[i].id == message.author.id) {
                                                        if (!blockCMD) return; // If the command is not suppossed to be executed when a user is blocked, sned no repsonse
                                                    }
                                                }
                                            }

                                            // Check if the member sending the message has appropiate permissions to run a command
                                            let commandPermissions = commandFile['perms'];
                                            if (commandPermissions) {
                                                if (message.member.permissions.has(commandPermissions)) {
                                                    if (guildConfig.bot != message.channel.id && !isMod) return; // If the command is requested outside the command channel and is not a moderation command, send no response
                                                    commandFile['run'](message, prefix, args, client)
                                                } else {
                                                    functions.embed(message.channel, "Error", colourWarn, `You are missing the permission: ${commandPermissions}`)
                                                }
                                            } else {
                                                if (functions.getServerConfig(message.guild.id).bot != message.channel.id && !isMod) return;
                                                commandFile['run'](message, prefix, args, client)
                                            }
                                        }
                                    } catch (err) {
                                        functions.embed(message.channel, "", colourWarn, "An error occured!");
                                        error_handler(err, "Command Error!", `Message: ${message.content}`)
                                    }
                                } else {
                                    functions.embed(message.channel, "", colourWarn, "Command does not exist");
                                }
                            } catch (error) {
                                functions.embed(message.channel, "", colourWarn, "An error occured!");
                                error_handler(err, "Command Error!", `Message: ${message.content}`)
                            }
                        } else {
                            error_handler(err, "Unexpected Error!")
                            functions.embed(message.channel, "", colourWarn, "An unexpected error has occured. Please contact the bot owner (Simyon#6969)");
                        }
                    });
                }
            } catch (err) {
                error_handler(err, "Unexpected Error!")
            }
        });
    }
}