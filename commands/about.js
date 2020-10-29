const discord = require('discord.js');
const fileSystem = require('fs');
const packageJSON = JSON.parse(fileSystem.readFileSync('package.json', 'utf8'));
module.exports = {
	run: (message) => {
		let aboutMessage = new discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('About Interstellar')
			.setDescription('The Discord bot from interstellar space.')
			.addFields(
				{ name: 'Version', value: packageJSON.version },
				{ name: 'Released', value: '28 October 2020' },
				{ name: 'Authors', value: packageJSON.author }
			);
		message.channel.send(aboutMessage);
	}
};