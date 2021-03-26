const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
let colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'unblock',
    description: 'Unblock someone',
    category: 'moderation',
    modcommand: true,
    blockCMD: true,
    usage: 'unblock <user> <admin block(true,false)>',
    perms: 'MANAGE_GUILD',
    alias: [],
    cooldown: 10,
    run: function (message, prefix, args, client) {
        if (args.lenghts != 2) {
            let user = message.mentions.users.first();
            if (user) {
                let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`))
                if (typeof file.blockedUsers !== 'undefined') {
                    let found = false
                    let forindex = 0
                    for (let index = 0; index < file.blockedUsers.length; index++) {
                        if (file.blockedUsers[index].id == user) {
                            found = true
                            forindex = index
                        }
                    }
                    if (found) {
                        if (file.blockedUsers[forindex].adminBlock) {
                            if (message.author.id != functions.config().special.owner) {
                                message.channel.send("That user is admin blocked and you are not my owner so i cant unblock that user")
                                return;
                            }
                        }
                        file.blockedUsers.splice(forindex,1)
                        fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                        message.channel.send(`daddy i unblocked <@${user.id}>!!!! now pwease punch me!!!!!!!`)
                    } else {
                        message.channel.send("uwu i couldn't find that user in my config files")
                    }
                } else {
                    message.channel.send("uwu i couldn't find that user in my config files")
                }
            } else {
                message.channel.send("haha very funni but pleae specify a user by mentioning him/her")
            }
        } else {
            message.channel.send("who tf should i unblock?")
        }
    }
}