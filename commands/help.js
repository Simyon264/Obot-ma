const discord = require('discord.js');
//CREATE HELP TOPIC MESSAGE
function sendEmbbedHelpMessage(message, commandName, howToUse, permsNeeded) {
	let helpMessage = new discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(commandName)
		.addFields(
			{ name: 'How To Use', value: howToUse },
			{ name: 'Permissions', value: permsNeeded }
		)
	message.channel.send(helpMessage);	
}
module.exports = {
	run: (message, commandHelp) => {
		if (commandHelp != undefined) {
			//SWITCH CASE
			switch(commandHelp) {
				case 'about':
					sendEmbbedHelpMessage(message, 'About', '`s?about`', 'Everyone can run this command.')
					break;	
				case 'help':
					sendEmbbedHelpMessage(message, 'Help', '`s?help [Command]`', 'Everyone can run this command.')
					break;					
				case 'poll':
					sendEmbbedHelpMessage(message, 'Poll', '`s?poll [Poll Title];[Option 1];[Option 2];[Option 3] ...` You can have up to 9 options.', 'Everyone can run this command.')
					break;
				case 'ban':
					sendEmbbedHelpMessage(message, 'Ban', '`s?ban [Username];[Reason]`', 'Only moderators can run this command.')
					break;		
				case 'kick':
					sendEmbbedHelpMessage(message, 'Kick', '`s?kick [Username];[Reason]`', 'Only moderators can run this command.')
					break;	
				case 'mute':
					sendEmbbedHelpMessage(message, 'Mute', '`s?mute [Username];[Reason]`', 'Only moderators can run this command.')
					break;	
				case 'unmute':
					sendEmbbedHelpMessage(message, 'Unmute', '`s?unmute [Username]`', 'Only moderators can run this command.')
					break;	
				case 'warn':
					sendEmbbedHelpMessage(message, 'Warn', '`s?warn [Username];[Reason]`', 'Only moderators can run this command.')
					break;		
				case 'clear':
					sendEmbbedHelpMessage(message, 'Clear', '`s?clear [Amount of messages]`', 'Only moderators can run this command.')
					break;	
			};
		} else {
			//CREATE DEFUALT HELP MESSAGE
			let helpMessage = new discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Help')
				.addFields(
					{ name: 'General', value: '`s?help` `s?about` `s?poll`' },
					{ name: 'Moderation', value: '`s?ban` `s?kick` `s?mute` `s?unmute` `s?warn` `s?clear`' },
					{ name: 'Help For Specific Commands', value: 'To get help for any command, do `s?help [command name]`' }
				)
			message.channel.send(helpMessage);
		}
	}
};