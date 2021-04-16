// Imports
const fs = require("fs"); //File system
const colors = require("colours") // Colors in the console
const f = require("../functions.js"); // General functions
const Discord = require('discord.js') // Discord.... duh
const path = require('path'); // Used for the errror handler


module.exports = {
    run: function (client) {
        client.on('message', (message) => {
            if (!message.guild) return; // Check if a message is a guild, and ignores it
            if (message.author.bot) return; // Check if message is from a bot, and ignores it

            const colourInfo = f.config().messageColours.info;

            //Read the server config file, and if it's missing, create one.
            try {
                f.log(`Reading guild config file for ${message.guild.name} (${message.guild.id})...`)
                JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`, "utf-8"))
                f.log(`File ok.`)
            } catch (err) {
                f.log(`Read failed!`)
                console.log(`${colors.red('Error: Guild config file for')} ${colors.yellow(message.guild.name)} ${colors.red('is missing, creating file...')}`)
                // Reading the template file.
                let serverConfigTemplate = fs.readFileSync("./files/serverConfigs/template.json", "utf-8")
                // Writting new config file.
                fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, serverConfigTemplate)
                f.log(`New config file was written!`)
                console.log(`${colors.green('Success: Guild config file for')} ${colors.yellow(message.guild.name)} ${colors.green('was written!')}`)
            }

            const guildConfig = f.getServerConfig(message.guild.id)

            //Defining blocked users for ping
            let blockedUsers = guildConfig.blockedUsers
            f.log('Looking if pinged...')
            if (client.user == message.mentions.users.first()) { // If bot is pinged
                if (typeof blockedUsers !== 'undefined') { //If blocked users is valid
                    for (let i = 0; i < blockedUsers.length; i++) { // For loop for all blocked users, if true: dont send a response
                        if (blockedUsers[i].id == message.author.id) return f.log(`Ping message cancelled, user (${message.author.id}) is blocked.`) // Don't send a repsonse
                    }
                }
                f.log(`Blocked users for ${message.guild.name} is undefined.`)
                // Sending response
                f.embed(message.channel, "Hey!", colourInfo, `My prefix is **${guildConfig.prefix}**`)
                f.log(`Message response for ${message.content} send.`)
                return;
            }

            const content = message.content;
            f.log('Looking if rigged...')
            // Respond to messages containing "rigged"
            if (content.includes("rigged")) {
                f.log('Rigged has been detected! Generating new number...')
                let randomNumber = f.randomInt(1, 200)
                f.log(`Number generated! ${randomNumber}`)
                if (randomNumber == 69) {
                    message.channel.send("its rigged")
                } else {
                    message.channel.send("its not rigged")
                }
                f.log("Message sent!")
            }
        });
    }
}