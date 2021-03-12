const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require("fs")

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'changelog',
    description: 'Displays the changelog',
    category: 'general',
    usage: '',
    perms: '',
    alias: [],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        let embed = new discord.MessageEmbed()
            .setTitle("Changelog")
            .setColor(colourInfo)
            .setDescription(fs.readFileSync("./files/important files/changelog.txt",))
            .setThumbnail(client.user.avatarURL())
        //.addField("Invite", `[Here](${functions.config().bot.invite} 'Click me to invite me!')`)
        message.channel.send(embed);
    }
}