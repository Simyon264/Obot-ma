const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'uptime',
    description: 'Gives the bot uptime',
    category: 'general',
    modcommand: false,
    usage: 'uptime',
    perms: '',
    alias: ["ut"],
    cooldown: 10,
    run: function (message, prefix, args, client) {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let embed = new discord.MessageEmbed()
            .setTitle("**Uptime**")
            .setDescription("Uptime: ", `${days}:${hours}:${minutes}:${seconds}`)
            .setColor(0xff2121)
        message.channel.send(embed)
    }
}