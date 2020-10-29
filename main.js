//REQUIRE MODULES
const dotEnv = require('dotenv');
const discord = require('discord.js');
const command = require('./command.js')
const discordClient = new discord.Client();

//GET DISCORD CLIENT FROM .ENV FILE (ENVIROMENT VARIABLES ARE USED AS IT'S THE STANDARD FOR HIDING SECRETS IN CODE)
dotEnv.config();

//CHECK IF .ENV FILE HAS BEEN EDITED
if (process.env.DISCORD_TOKEN == '') {
	throw new Error('PLEASE ENTER YOUR DISCORD TOKEN IN THE .ENV FILE')
};

//LOGIN TO THE DISCORD CLIENT
discordClient.login(process.env.DISCORD_TOKEN)

//WHEN THE CLIENT IS READY
discordClient.once('ready', () => {
	//ON MESSAGE
	discordClient.on('message', message => {
		if (discordClient.user == message.mentions.users.first()) {
			let mention = `<@!${message.mentions.users.first().id}>`
			let messageWithoutMention = message.content.replace(mention, '')
			if (messageWithoutMention == '') {
				message.channel.send('The bot prefix is `s?`');
			};
		}
		command.embed(message);
	});
});