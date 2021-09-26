const f = require('../functions.js');
const discord = require('discord.js');

module.exports = {
    name: 'cap',
    description: f.localization("commands","cap","exports").description,
    category: 'fun',
    modcommand: false,
    usage: f.localization("commands","cap","exports").usage,
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
            } else f.embed(message, "", randomColor, f.localization("commands","cap","normalCap",[randomNumber]))
        } else {
            const randomNumber = Math.floor(Math.random() * 100) // Generate random number
            f.log(`Cap number generated. ${randomNumber}`)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16) // Generate a random color
            f.embed(message, "", randomColor, f.localization("commands","cap","customCap",[args[1],randomNumber]))
        }
    }
}