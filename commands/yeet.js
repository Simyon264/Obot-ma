const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
let colourDone = functions.config().messageColours.done;

module.exports = {
	name: 'yeet',
	description: 'Yeet something out of existence!',
	category: 'fun',
	modcommand: false,
	usage: 'yeet <the thing you want to yeet>',
	perms: '',
	alias: ["yeeeeeeeeeet"],
	cooldown: 2,
	run: function (message, prefix, args, client) {
		if (args.length > 1) {
			let reasonArgs = args;
			reasonArgs.splice(0, 1);
			let reason = reasonArgs.join(" ")
			let id = reason
			let author = message.author.username
			let yeetFile = JSON.parse(fs.readFileSync("./files/strings/yeet.json"))
			let random = yeetFile[Math.floor(Math.random() * yeetFile.length)];

			newString = random
			for (let index = 0; index < newString.length; index++) {
				newString = newString.replace('yeeter', author)
				newString = newString.replace('theYeeted', id)
			}
			message.reply(newString)
			//functions.embed(message.channel,"YEET",colourInfo,yeetFile[random])
		} else {
			message.reply("What are you trying to yeet?")
		}
	}
}