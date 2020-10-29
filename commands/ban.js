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
		//GET COMMAND PARAMETERS
		const username = parameters.split(';')[0]
		const reason = parameters.split(';')[1]
		//IF THE PARAMTERS ARE MISSING/TOO MANY PARAMETERS
		if (parameters.split(';').length > 2 || parameters.split(';').length < 2) {
			sendEmbedMessage(message, 'Incorrect usage! For help with this command, do `s?help ban`', '#f54242')
		//IF THERE IS NO MENTION IN THE MESSAGE
		} else if (message.mentions == undefined) {
			sendEmbedMessage(message, 'Please mention who you would like to ban.', '#f54242');
		//IF THE USER MENTIONED DOESN'T EXIST
		} else if (message.mentions.users.first() == undefined) {
			sendEmbedMessage(message, 'Please mention a user who is in the server.', '#f54242');
		//IF THE MEMBER RUNNING THE COMMAND IS A MODERATOR
		} else if (message.member.roles.cache.find(role => role.name == 'Moderator')) {
			//IF THE MENTION MATCHES THE AUTHOR OF THE MESSAGE
			if (message.mentions.users.first().id == message.author.id) {
				sendEmbedMessage(message, 'You can\'t ban yourself.', '#f54242');
			} else {
				let banMember = message.mentions.members.first();
				let banDirectMessage = new discord.MessageEmbed()
					.setColor('fce803')
					.addFields(
						{ name: `You\'ve Been Banned from ${message.guild.name}`, value: `Reason: ${reason}` }
					)
				banMember.send(banDirectMessage).then(() => {
					banMember.ban({reason: reason}).then(() => {
						sendEmbedMessage(message, `${username} has been successfully banned.`, '#0099ff');
						message.delete();
					});
				})
			}
		} else {
			//IF THE MEMBER RUNNING THE COMMAND HAS NO PERMISSIONS
			sendEmbedMessage(message, 'You don\'t have permission to run this command.', '#f54242');
			message.delete();
		};
	}
};