const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'ping',
    description: 'Gives the bot ping',
    category: 'general',
    modcommand: false,
    usage: '',
    perms: '',
    alias: ["uptime"],
    cooldown: 10,
    run: function (message, prefix, args, client) {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let colour
        if (client.ws.ping > 150) {
            colour = 0xff2121
        } else {
            colour = 0x26e08d
        }
        message.channel.send("〽️ Pinging").then((m) => {
            let embed = new discord.MessageEmbed()
                .setTitle("Pong! :ping_pong:")
                .addField("Ping: ", client.ws.ping + "ms")
                .addField("Uptime: ", `${days}d ${hours}h ${minutes}m ${seconds}s`)
                .setColor(colour)
            m.edit(embed)
            m.edit("")
        }).catch((err) => {
            console.log(err)
        });
    }
}