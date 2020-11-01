const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
let colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'setLogChannel',
    description: 'Sets the log channel for the server!',
    category: 'server',
    usage: '<channel>',
    perms: 'MANAGE_GUILD',
    alias: ["slc", "logchannel"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`))
        if (args.length !== 2) {
            functions.embed(message.channel, "Error", colourWarn, "Please specify the log channel!")
        } else {
            let channelID = message.mentions.channels.first().id
            if (channelID) {
                let s = "`"
                file.logging = channelID;
                fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                functions.embed(message.channel, "Done!  :clap:", colourDone, `The log channel on ${s}${message.guild.name}${s} is now ${s}${message.mentions.channels.first().name}${s}!`)
            } else {
                functions.embed(message.channel, "Error", colourWarn, "Please specify the log channel!")
            }
        }
    }
}