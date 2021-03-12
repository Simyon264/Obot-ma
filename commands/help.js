const functions = require('../functions.js');
const fs = require('fs');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
	name: 'help',
	description: 'Gives a list of commands available in the bot',
	category: 'general',
	usage: '[command]',
	perms: '',
	alias: ["h"],
	cooldown: 1,
	run: function (message, prefix, args) {
		if (args.length == 1) {
			var categories = functions.config().commands.categories
			var files = fs.readdirSync('./commands');

			var embed = new discord.MessageEmbed()
				.setTitle("Commands")
				.setColor(colourInfo)
				.setDescription("");

			for (let i = 0; i < categories.length; i++) {
				var categoryArray = [];
				var categoryName = categories[i].charAt(0).toUpperCase() + categories[i].substring(1);

				for (let j = 0; j < files.length; j++) {
					var file = require(`./${files[j]}`);

					if (file.category == categories[i]) {
						categoryArray.push(`\`${file.name}\``);
					}
				}

				embed.addField(categoryName, categoryArray.join(", "));
			}
			embed.addField("Help For Specific Commands", "To get help for any command, do `" + prefix + "help [command name]`")
			message.channel.send(embed);
		} else if (args.length >= 2) {
			fs.stat(`./commands/${args[1]}.js`, function (err, stat) {
				if (err == null) {
					var commandFile = require(`./${args[1]}.js`);

					var cmdName = commandFile['name'];
					var cmdDesc = commandFile['description'];
					var cmdCategory = commandFile['category'];
					var cmdUsage = commandFile['usage'];
					var cmdRoles = commandFile['perms'];
					let cooldown = commandFile['cooldown']
					let aliases = commandFile['alias']

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
				} else if (err.code === 'ENOENT') {
					functions.embed(message.channel, "", colourWarn, "Specified command does not exist");
				} else {
					console.log(err);

					functions.embed(message.channel, "", colourWarn, "An error has occured. It has been logged to fix it.");
				}
			});
		}
	}
}