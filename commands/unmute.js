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
		const username = parameters
		//IF THERE IS NO MENTION IN THE MESSAGE
		if (message.mentions == undefined) {
			sendEmbedMessage(message, 'Please mention who you would like to unmute.', '#f54242');
		//IF THE USER MENTIONED DOESN'T EXIST
		} else if (message.mentions.users.first() == undefined) {
			sendEmbedMessage(message, 'Please mention a user who is in the server.', '#f54242');
		//IF THE MEMBER RUNNING THE COMMAND IS A MODERATOR
		} else if (message.member.roles.cache.find(role => role.name == 'Moderator')) {
			//IF THE MENTION MATCHES THE AUTHOR OF THE MESSAGE
			if (message.mentions.users.first().id == message.author.id) {
				sendEmbedMessage(message, 'You can\'t unmute yourself.', '#f54242');
			} else {
				let unmuteMember = message.mentions.members.first();
				let mutedRole = message.guild.roles.cache.find(role => role.name == 'Muted');
				unmuteMember.roles.remove(mutedRole).then(() => {
					sendEmbedMessage(message, `${username} has been successfully unmuted.`, '#0099ff');
					message.delete();
				}).catch((error) => {
					//IF ERROR CODE IS 50013 (MISSING PERMS ERROR)
					if (error.code == 50013) {
						sendEmbedMessage(message, 'I am unable to unmute the user. Maybe I am missing Manage Roles permission?', '#f54242');
						message.delete();
					};
				});
			};
		} else {
			//IF THE MEMBER RUNNING THE COMMAND HAS NO PERMISSIONS
			sendEmbedMessage(message, 'You don\'t have permission to run this command.', '#f54242');
		};
	}
};