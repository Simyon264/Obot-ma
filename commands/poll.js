const discord = require('discord.js');
let emotes = ['🟥','🟦','🟧','🟨','🟩','🟪','🟫','⬜','🟡']
//SEND EMBED ERROR/SUCCESS MESSAGES
function sendEmbedMessage(message, text, colour) {
	let embedMessage = new discord.MessageEmbed()
		.setColor(colour)
		.setDescription(text)
	message.channel.send(embedMessage);	
};
//CONVERT ARRAY OF OPTIONS INTO A MULTI-LIN STRING OF OPTIONS FOR EMBED MESSAGE
function generateOptionsForEmbed(length, pollParameters) {
	let options = '';
	for (let i = 1; i < length; i++) {
		options += `${emotes[i-1]} ${pollParameters[i]}\n`
	};
	return options
};
module.exports = {
	run: (message, parameters) => {
		let pollParameters = parameters.split(';')
		//IF PARAMETERS ABOVE 10 OR BELOW 3
		if (pollParameters.length > 10 || pollParameters < 3) {
			sendEmbedMessage(message, 'Incorrect usage! For help with this command, do `s?help poll`', '#f54242')
		} else {
			//CREATE POLL
			let pollTitle = pollParameters[0]
			let pollMessage = new discord.MessageEmbed()
				.setColor('#0099ff')
				.addFields(
					{ name: pollTitle, value: generateOptionsForEmbed(pollParameters.length, pollParameters) }
				)
			//SEND POLL
			message.channel.send(pollMessage)
			.then((message) => {
				for (let i = 1; i < pollParameters.length; i++) {
					message.react(emotes[i-1]);
				};
			});
		};
	}
};