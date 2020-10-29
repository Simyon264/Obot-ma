const discord = require('discord.js');
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
			commandFile['run'](message, commandParameters);
		//IF THE COMMAND FILE DOESN'T EXIST
		} catch(error) {
			if (error.code == 'MODULE_NOT_FOUND') {
				message.channel.send('Sorry, the command you entered doesn\'t exist. Please run `s?help` for commands.');
			//IF AN UNRELATED ERROR OCCURS
			} else {
				console.log(error)
				message.channel.send('That\'s weird, an unexpected error has occured.');
			};
		};
	};
};