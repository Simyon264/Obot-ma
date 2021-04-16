const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
let colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'block',
    description: 'Block someone from using a command.',
    category: 'moderation',
    modcommand: true,
    //blockCMD: true,
    usage: 'block <user> <admin block(true,false)>',
    perms: 'MANAGE_GUILD',
    alias: [],
    cooldown: 10,
    run: function (message, prefix, args, client) {
        if (args.length >= 2) {
            let admin = false
            if (args.length == 3) {
                if (message.author.id == functions.config().special.owner) {
                    if (args[2] == "true") {
                        admin = true
                    }
                } else {
                    message.channel.send("awww you silly goose!!!! only my owner is able to admin block someone!!!!")
                    return;
                }
            }
            let user = message.mentions.users.first();
            if (user) {
                user = message.mentions.users.first().id
                let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`))
                if (typeof file.blockedUsers !== 'undefined') {
                    let found = false
                    for (let index = 0; index < file.blockedUsers.length; index++) {
                        if (file.blockedUsers[index].id == user) {
                            found = true
                        }
                    }
                    if (found) {
                        message.channel.send("uwu i already found this user in my database along with ur long-")
                        return;
                    }
                    file.blockedUsers.push({
                        id: `${user}`,
                        adminBlock: admin
                    })
                    fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                    message.channel.send(`daddy i blocked <@${user}>!!!! now pwease punch me!!!!!!!`)
                } else {
                    file.blockedUsers = []
                    let found = false
                    for (let index = 0; index < file.blockedUsers.length; index++) {
                        if (file.blockedUsers[index].id == user) {
                            found = true
                        }
                    }
                    if (found) {
                        message.channel.send("uwu i already found this user in my database along with ur long-")
                        return;
                    }
                    file.blockedUsers.push({
                        id: `${user}`,
                        adminBlock: admin
                    })
                    fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                    message.channel.send(`daddy i blocked <@${user}>!!!! now pwease punch me!!!!!!!`)
                }
            } else {
                message.channel.send("haha very funni but pleae specify a user by mentioning him/her")
            }
        } else {
            message.channel.send("who tf do you want me to block?")
        }
    }
}