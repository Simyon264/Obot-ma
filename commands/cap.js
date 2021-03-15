const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'cap',
    description: 'See how cap something is!',
    category: 'fun',
    modcommand: false,
    usage: 'cap [anything]',
    perms: '',
    alias: ["hc", "howcap"],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        if (args.length <= 1) {
            const randomNumber = Math.floor(Math.random() * 101)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            if (randomNumber == 100) {
                message.channel.send("100% cap")
            } else {
                functions.embed(message.channel, "", randomColor, `That is ${randomNumber}% cap`)
            }
        } else {
            const randomNumber = Math.floor(Math.random() * 100)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            functions.embed(message.channel, "", randomColor, `${args[1]} is ${randomNumber}% cap`)
        }
    }
}