const f = require('../functions.js');
const fs = require('fs');
const discord = require('discord.js');



module.exports = {
	name: 'help',
	description: 'Gives a list of commands available in the bot',
	category: 'general',
	modcommand: false,
	usage: 'help [command]',
	perms: '',
	alias: ["h"],
	cooldown: 1,
	run: function (message, prefix, args) {
		function sendMsg(commandFile) {
			let cmdName = commandFile['name'];
			const cmdDesc = commandFile['description'];
			let cmdCategory = commandFile['category'];
			const cmdUsage = commandFile['usage'];
			let cmdRoles = commandFile['perms'];
			const cooldown = commandFile['cooldown']
			const aliases = commandFile['alias']

			let final = ""
			for (let index = 0; index < aliases.length; index++) {
				final = `${final}\`${aliases[index]}\`,`
			}

			cmdName = cmdName.charAt(0).toUpperCase() + cmdName.slice(1);
			cmdCategory = cmdCategory.charAt(0).toUpperCase() + cmdCategory.slice(1);
			cmdRoles = cmdRoles.charAt(0).toUpperCase() + cmdRoles.slice(1);

			let embed = new discord.MessageEmbed()
				.setTitle(cmdName)
				.setColor(colourInfo)
				.addField("Description", cmdDesc || "*none*")
				.addField("Category", cmdCategory || "*none*")
				.addField("Usage", cmdUsage || "*none*")
				.addField("Permissions", cmdRoles || "*none*");
			embed.addField("Cooldown", cooldown + " Second(s)" || "*none*")
			embed.addField("Aliases", final || "*none*")
			embed.setDescription(`\`[]\` means optional and \`<>\` is required. The bot prefix is \`${prefix}\``)

			message.channel.send(embed);
		}
		const colourInfo = f.config().messageColours.info;
		const colourWarn = f.config().messageColours.warn;

		if (args.length == 1) { // Check if a command was specifed
			const categories = f.config().commands.categories // Get all categories
			const files = fs.readdirSync('./commands');

			// Generate the embed
			let embed = new discord.MessageEmbed()
				.setTitle("Commands")
				.setColor(colourInfo)
				.setDescription("");

			for (let i = 0; i < categories.length; i++) {
				let categoryArray = [];
				const categoryName = categories[i].charAt(0).toUpperCase() + categories[i].substring(1);

				for (let j = 0; j < files.length; j++) {
					let file = require(`./${files[j]}`);

					if (file.category == categories[i]) {
						categoryArray.push(`\`${file.name}\``);
					}
				}
				try {
					embed.addField(categoryName, categoryArray.join(", "));
				} catch (err) {
					f.log(`Category ${categoryName} has no commands.`)
				}
			}
			embed.addField("Help For Specific Commands", "To get help for any command, do `" + prefix + "help [command name]`")
			message.channel.send(embed);
		} else if (args.length >= 2) {
			fs.stat(`./commands/${args[1]}.js`, function (err, stat) {
				if (err == null) {
					const commandFile = require(`./${args[1]}.js`);
					sendMsg(commandFile)
				} else if (err.code === 'ENOENT') {
					let dir = fs.readdirSync("./commands/")
					let commandFile2
					let found = false
					for (let index = 0; index < dir.length; index++) {
						commandFile2 = require(`../commands/${dir[index]}`);
						if (commandFile2['alias'].includes(args[1].toLowerCase())) {
							found = true;
							var newCommandFile = index
							index = dir.length;
							continue;
						}
					}
					if (found) {
						let commandFile = require(`../commands/${dir[newCommandFile]}`);
						sendMsg(commandFile)
					} else {
						f.embed(message.channel, "", colourWarn, "Specified command does not exist");
					}
				} else {
					console.log(err);

					f.embed(message.channel, "", colourWarn, "An error has occured. It has been logged to fix it.");
				}
			});
		}
	}
}