const f = require('../functions.js');
const discord = require('discord.js');


module.exports = {
	name: 'about',
	description: 'About the bot',
	category: 'general',
	modcommand: false,
	usage: 'about',
	perms: '',
	alias: [],
	cooldown: 1,
	run: function (message, prefix, args, client) {
		// Get the info color
		const colourInfo = f.config().messageColours.info;
		f.log(`Got info colour, ${colourInfo}`)

		// Get the days, minutes and seconds
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;
		f.log(`Got uptime, ${days}d ${hours}h ${minutes}m ${seconds}s `)

		// Construct the embed
		let embed = new discord.MessageEmbed()
			.setTitle("About")
			.setColor(colourInfo)
			.setDescription(f.config().bot.description)
			.addField("Version", f.config().bot.version)
			.addField("Author", f.config().bot.Authors)
			.setThumbnail(client.user.avatarURL())
			.addField("Uptime", `${days}d ${hours}h ${minutes}m ${seconds}s`)
		// Send the embed
		f.log("Message sent.")
		message.channel.send(embed);
	}
}