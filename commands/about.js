const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
	name: 'about',
	description: 'About the bot',
	category: 'general',
	usage: '',
	perms: '',
	alias: [],
	cooldown: 1,
	run: function (message, prefix, args, client) {
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;

		let embed = new discord.MessageEmbed()
			.setTitle("About")
			.setColor(colourInfo)
			.setDescription(functions.config().bot.description)
			.addField("Version", functions.config().bot.version)
			.addField("Author", functions.config().bot.Authors)
			.setThumbnail(client.user.avatarURL())
			.addField("Uptime", `${days}d ${hours}h ${minutes}m ${seconds}s`)
			//.addField("Invite", `[Here](${functions.config().bot.invite} 'Click me to invite me!')`)
		message.channel.send(embed);
	}
}