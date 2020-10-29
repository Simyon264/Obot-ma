const discord = require('discord.js');
//SEND EMBED ERROR/SUCCESS MESSAGES
function sendEmbedMessage(message, text, colour) {
	let embedMessage = new discord.MessageEmbed()
		.setColor(colour)
		.setDescription(text)
	message.channel.send(embedMessage);	
};
exports.embed = (message) => {
	//PARAMETERS
	let messageSent = message.content;
	let messagePrefix = messageSent.slice(0, 2).toLowerCase();
	let messageWithoutPrefix = messageSent.slice(2);
	let command = messageWithoutPrefix.split(/ (.+)/)[0].toLowerCase();
	let commandParameters = messageWithoutPrefix.split(/ (.+)/)[1];
	//CHECK FOR MESSAGE PREFIX
	if (messagePrefix == 's?') {
		//TRY TO OPEN A COMMAND FILE
		try {
			let commandFile = require(`./commands/${command}`);
			if (commandParameters == undefined && command != 'help' && command != 'about') {
				sendEmbedMessage(message, `Incorrect usage! For help with this command, do \`s?help ${command}\``, '#f54242');
			} else {
				commandFile['run'](message, commandParameters);
			};
		//IF THE COMMAND FILE DOESN'T EXIST
		} catch(error) {
			if (error.code == 'MODULE_NOT_FOUND') {
				sendEmbedMessage(message, 'Sorry, the command you entered doesn\'t exist. Please run `s?help` for commands.', '#f54242');
			//IF AN UNRELATED ERROR OCCURS
			} else {
				console.log(error)
				sendEmbedMessage(message, 'That\'s weird, an unexpected error has occured. You may want to contact the server owner if this issue is recurring.', '#f54242');
			};
		};
	};
};
