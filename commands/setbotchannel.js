const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

const colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'setbotchannel',
    description: 'Sets the bot channel for the server!',
    category: 'server',
    modcommand: true,
    usage: 'setbotchannel <channel>',
    perms: 'MANAGE_GUILD',
    alias: ["sbc", "botchannel"],
    cooldown: 10,
    run: function (message, prefix, args, client) {
        let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`))
        if (args.length !== 2) {
            message.channel.send("Please specify the new bot channel!")
        } else {
            try {
                let channelID = message.mentions.channels.first().id
                if (channelID) {
                    let s = "`"
                    file.bot = channelID;
                    fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                    functions.embed(message, "Done!  :clap:", colourDone, `The bot channel is now ${s}${message.mentions.channels.first().name}${s}!`)
                } else {
                    message.channel.send("Please specify the new bot channel!")
                }
            } catch (error) {
                message.channel.send("Please specify the new bot channel!")
            }
        }
    }
}