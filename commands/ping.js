const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
	name: 'ping',
	description: 'Shuts the bot down.',
	category: 'owner',
	usage: '',
    perms: '',
    cooldown: 10,
    run: function (message, prefix, args, client) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        let ping = message.createdTimestamp - Date.now()

        let colour 
        if (ping > 500) {
            colour = 0xff2121
        } else {
            colour = 0x26e08d
        }

        let embed = new discord.MessageEmbed()
            .setTitle("Pong! :ping_pong:")
            .addField("API:", ping + "ms")
            .addField("Client: ", client.ws.ping + "ms")
            .addField("Uptime: ", `${days}d ${hours}h ${minutes}m ${seconds}s`)
            .setColor(colour)

        message.channel.send("〽️ Pinging").then((m) => {
            m.edit(embed).then((m) => {
                m.edit("")
            });
        });

        
	}
}