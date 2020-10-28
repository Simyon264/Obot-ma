const fs = require('fs')
const discord = require('discord.js')
exports.config = function (config) {
    try {
        return (JSON.parse(fs.readFileSync("./config.json")))
    } catch (error) {
        console.log("Error: Config file missing or damaged!")
    }
}

exports.embed = function(channel, title, colour, message) {
	var embed = new discord.MessageEmbed()
		.setTitle(title)
		.setColor(colour)
		.setDescription(message);
		
	channel.send(embed);
}