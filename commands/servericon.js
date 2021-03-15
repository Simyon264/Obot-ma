const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'servericon',
    description: 'Shows the server icon',
    category: 'server',
    usage: 'servericon',
    modcommand: false,
    perms: '',
    alias: ["icon", "si"],
    cooldown: 5,
    run: function (message, prefix, args, client) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16)
        let embed = new discord.MessageEmbed()
            .setTitle(`Server icon for ${message.guild.name}`)
            .setImage(message.guild.iconURL({
                size: 4096,
                dynamic: true
            }))
            .setColor(randomColor)
        message.channel.send(embed);
    }
}