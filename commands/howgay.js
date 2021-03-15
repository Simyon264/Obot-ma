const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'howgay',
    description: 'See how gay something is!',
    category: 'fun',
    modcommand: false,
    usage: 'howgay [anything]',
    perms: '',
    alias: ["hg", "gay"],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        if (args.length <= 1) {
            const randomNumber = Math.floor(Math.random() * 101)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            if (randomNumber == 100) {
                message.channel.send("100% gay, you like Valorant.")
            } else {
                functions.embed(message.channel, "", randomColor, `${message.author.username} is ${randomNumber}% gay`)
            }   
        } else {
            const randomNumber = Math.floor(Math.random() * 101)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            if (randomNumber == 100) {
                functions.embed(message.channel, "", randomColor, `${args[1]} likes valorant, 100% gay.`)
            } else {
                functions.embed(message.channel, "", randomColor, `${args[1]} is ${randomNumber}% gay`)
            }
        }
    }
}