const config = require('../config.json');
const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
	name: 'about',
	description: 'About the bot',
	category: 'general',
	usage: '',
	roles: 'everyone',
    run: function (message, prefix,args,client) {
		let embed = new discord.MessageEmbed()
			.setTitle("About")
			.setColor(colourInfo)
			.setDescription(functions.config().bot.description)
			.addField("Version", functions.config().bot.version)
            .addField("Author", functions.config().bot.Authors)
            .setThumbnail(client.user.avatarURL())

		message.channel.send(embed);
	}
}