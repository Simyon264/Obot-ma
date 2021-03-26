const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

const colourInfo = functions.config().messageColours.info;
const colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'config',
    description: 'Read a config!',
    category: '',
    modcommand: true,
    usage: 'config <config>',
    perms: 'MANAGE_GUILD',
    alias: [],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        if (args.length >= 2) {
            if (true) {
                if (args[1] == "config") {
                    if (message.author.id == functions.config().special.owner) {
                        let config = fs.readFileSync('./files/important files/config.json', 'utf-8')
                        let embed = new discord.MessageEmbed()
                            .addField("`CONFIG`", "```xl\n" + config + "\n```")
                            .setColor(colourInfo)
                        message.channel.send(embed)
                    } else {
                        message.channel.send("im so sorry, but i cant do that for you")
                    }
                } else {
                    if (args[1] == message.guild.id) {
                        const config = fs.readFileSync(`./files/serverConfigs/${args[1]}.json`, 'utf-8')
                        let embed = new discord.MessageEmbed()
                            .addField("`CONFIG`", "```xl\n" + config + "\n```")
                            .setColor(colourInfo)
                        message.channel.send(embed)
                    } else {
                        if (message.author.id == functions.config().special.owner) {
                            try {
                                const config = fs.readFileSync(`./files/serverConfigs/${args[1]}.json`, 'utf-8')
                                let embed = new discord.MessageEmbed()
                                    .addField("`CONFIG`", "```xl\n" + config + "\n```")
                                    .setColor(colourInfo)
                                message.channel.send(embed)
                            } catch (error) {
                                message.channel.send("your so gay like fr this config is not a thing and you still made me search for it... smh my head")
                            }
                        } else {
                            message.channel.send("this config does not belong to this server you dummy!!!!!! we belive in security since we are not saturn.")
                        }
                    }
                }
            }
        } else {
            message.channel.send("damn bro you're really funny not telling me what you need")
        }
    }
}