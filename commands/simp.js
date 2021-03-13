const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'simp',
    description: 'Checks if a user is a simp.',
    category: 'fun',
    usage: '[anything]',
    perms: '',
    alias: ["smp", "howsimp","hs"],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        if (args.length <= 1) {
            const randomNumber = Math.floor(Math.random() * 100)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            if (randomNumber == 100) {
                message.channel.send("100% simp, you like Okool.")
            } else {
                functions.embed(message.channel, "", randomColor, `${message.author.username} is ${randomNumber}% simp.`)
            }
        } else {
            const randomNumber = Math.floor(Math.random() * 100)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            functions.embed(message.channel, "", randomColor, `${args[1]} is ${randomNumber}% simp.`)
        }
    }
}