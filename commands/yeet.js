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
	usage: '<the thing you want to yeet>',
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
			//4 switches for 4 parts
			switch (random.part1) {
				case "yeeter":
					var part1 = `${author}`
					break;
				case "theYeeted":
					var part1 = `${id}`
					break;
				default:
					var part1 = random.part1
					break;
			}
			switch (random.part2) {
				case "yeeter":
					var part2 = `${author}`
					break;
				case "theYeeted":
					var part2 = `${id}`
					break;
				default:
					var part2 = random.part2
					break;
			}
			switch (random.part3) {
				case "yeeter":
					var part3 = `${author}`
					break;
				case "theYeeted":
					var part3 = `${id}`
					break;
				default:
					var part3 = random.part3
					break;
			}
			switch (random.part4) {
				case "yeeter":
					var part4 = `${author}`
					break;
				case "theYeeted":
					var part4 = `${id}`
					break;
				default:
					var part4 = random.part4
					break;
			}
			message.channel.send(`${part1}` + ` ${part2} ` + `${part3}` + ` ${part4}`)
			//functions.embed(message.channel,"YEET",colourInfo,yeetFile[random])
		} else {
			functions.embed(message.channel, "Error", colourWarn, "What are you trying to yeet?")
		}
	}
}