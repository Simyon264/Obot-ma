const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'ping',
    description: 'Gives ',
    category: 'general',
    usage: '',
    perms: '',
    cooldown: 10,
    run: function (message, prefix, args, client) {

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let colour
        if (client.ws.ping > 500) {
            colour = 0xff2121
        } else {
            colour = 0x26e08d
        }

        message.channel.send("〽️ Pinging").then((m) => {
            let ping = m.createdTimestamp - Date.now()
            let embed = new discord.MessageEmbed()
                .setTitle("Pong! :ping_pong:")
                .addField("Bot latency: ", ping + "ms")
                .addField("API: ", client.ws.ping + "ms")
                .addField("Uptime: ", `${days}d ${hours}h ${minutes}m ${seconds}s`)
                .setColor(colour)
            m.edit(embed).then((m) => {
                m.edit("").catch((err) => {
                    if (err.code == "50006") {
                        m.edit(`:rotating_light: WARNING :rotating_light:\nI need **embed links** permission!\nBot: ${ping}ms\nAPI: ${client.ws.ping}ms\nUptime: ${days}d ${hours}h ${minutes}m ${seconds}s`)
                    }
                })
            })
        }).catch((err) => {

        });
    }
}