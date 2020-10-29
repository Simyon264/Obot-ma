const discord = require('discord.js');
//SEND EMBED ERROR/SUCCESS MESSAGES
function sendEmbedMessage(message, text, colour) {
	let embedMessage = new discord.MessageEmbed()
		.setColor(colour)
		.setDescription(text)
	message.channel.send(embedMessage);	
};
module.exports = {
	run: (message, parameters) => {
		//IF PARAMETER ARE NOT A NUMBER
		if (isNaN(parameters)) {
			sendEmbedMessage(message, 'Please enter a valid number.', '#f54242');
		//IF THE PARAMETER IS OVER 100 OR UNDER 1
		} else if (parameters > 100 || parameters < 1) {
			sendEmbedMessage(message, 'Please enter a number between 1 and 100.', '#f54242');
		//IF USER RUNNING COMMAND HAS MODERATOR ROLE
		} else if (message.member.roles.cache.find(role => role.name == 'Moderator')) {
			message.channel.bulkDelete(parameters).then(() => {
				sendEmbedMessage(message, `${parameters} messages have been cleared.`, '#0099ff');
			});
		//IF THE USER DOESN'T HAVE THE MODERATOR ROLE
		} else {
			sendEmbedMessage(message, 'You don\'t have permission to run this command.', '#f54242');
		};
	}
};