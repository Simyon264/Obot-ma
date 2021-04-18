const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

const colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'setLogChannel',
    description: 'Sets the log channel for the server!',
    category: 'server',
    modcommand: true,
    usage: 'setlogchannel <channel>',
    perms: 'MANAGE_GUILD',
    alias: ["slc", "logchannel"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`))
        if (args.length !== 2) {
            message.channel.send("Please specify the new log channel!")
        } else {
            try {
                let channelID = message.mentions.channels.first().id
                if (channelID) {
                    let s = "`"
                    file.logging = channelID;
                    fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                    functions.embed(message.channel, "Done!  :clap:", colourDone, `The log channel on ${s}${message.guild.name}${s} is now ${s}${message.mentions.channels.first().name}${s}!`)
                } else {
                    message.channel.send("Please specify the new log channel!")
                }
            } catch (error) {
                message.channel.send("Please specify the new log channel!")
            }
        }
    }
}