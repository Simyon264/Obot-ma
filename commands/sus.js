const functions = require('../functions.js');

module.exports = {
    name: 'sus',
    description: 'Checks if a user is a impostor.',
    category: 'fun',
    modcommand: false,
    usage: 'sus [anything]',
    perms: '',
    alias: ["sussy", "howsus", "impostor???"],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        if (args.length <= 1) {
            const randomNumber = Math.floor(Math.random() * 101) // Generate random number
            const randomColor = Math.floor(Math.random() * 16777215).toString(16) // Generate random color
            if (randomNumber == 100) {
                message.channel.send("IMPOSTER??????")
            } else {
                functions.embed(message, "", randomColor, `${message.author.username} is ${randomNumber}% sus.`)
            }
        } else {
            const randomNumber = Math.floor(Math.random() * 101)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            functions.embed(message, "", randomColor, `${args[1]} is ${randomNumber}% sus.`)
        }
    }
}