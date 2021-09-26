const functions = require('../functions.js');
const fs = require('fs')

const colourWarn = functions.config().messageColours.warn;
const colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'setrulechannel',
    description: 'Sets the rule channel for the server!',
    category: 'server',
    modcommand: true,
    usage: 'setrulechannel <channel>',
    perms: 'MANAGE_GUILD',
    alias: ["src", "rulechannel"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`))
        if (args.length !== 2) {
            message.channel.send("Please specify the new rule channel!")
        } else {
            try {
                let channelID = message.mentions.channels.first().id
                if (channelID) {
                    let s = "`"
                    file.rules = channelID;
                    fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                    functions.embed(message, "Done!  :clap:", colourDone, `The rule channel is now ${s}${message.mentions.channels.first().name}${s}!`)
                } else {
                    message.channel.send("Please specify the new rule channel!")
                }
            } catch (error) {
                message.channel.send("Please specify the new rule channel!")
            }
        }
    }
}