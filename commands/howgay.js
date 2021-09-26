const f = require('../functions.js');
const discord = require('discord.js');


module.exports = {
    name: 'howgay',
    description: f.localization("commands","howgay","exports").description,
    category: 'fun',
    modcommand: false,
    usage: f.localization("commands","howgay","exports").usage,
    perms: '',
    alias: ["hg", "gay"],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        if (args.length <= 1) {
            const randomNumber = f.randomInt(0,100) // Generate random number
            const randomColor = Math.floor(Math.random() * 16777215).toString(16) // Generate random color
            if (randomNumber == 100) { // If the random number is 100, the person is very gay
                message.channel.send(f.localization("commands","howgay","100%self"))
            } else {
                f.embed(message, "", randomColor, f.localization("commands","howgay","self",[message.author.username,randomNumber]))
            }
        } else {
            const randomNumber = f.randomInt(0,100)
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            if (randomNumber == 100) {
                f.embed(message, "", randomColor, f.localization("commands","howgay","100%other",[args[1]]))
            } else {
                f.embed(message, "", randomColor, f.localization("commands","howgay","other",[args[1],randomNumber]))
            }
        }
    }
}