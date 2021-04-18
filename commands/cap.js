const f = require('../functions.js');
const discord = require('discord.js');

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
        if (args.length <= 1) { // See if something should be cap
            const randomNumber = Math.floor(Math.random() * 101)
            f.log(`Cap number generated. ${randomNumber}`)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            if (randomNumber == 100) {
                message.channel.send("100% cap")
            } else f.embed(message.channel, "", randomColor, `That is ${randomNumber}% cap`)
        } else {
            const randomNumber = Math.floor(Math.random() * 100) // Generate random number
            f.log(`Cap number generated. ${randomNumber}`)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16) // Generate a random color
            f.embed(message.channel, "", randomColor, `${args[1]} is ${randomNumber}% cap`)
        }
    }
}