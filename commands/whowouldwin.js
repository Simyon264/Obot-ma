const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'whowouldwin',
    description: 'Find out who would win between two people.',
    category: 'fun',
    usage: '<person1>,<person2>',
    perms: '',
    alias: ["www"],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        if (args.length >= 2) {
            const randomNumber = Math.floor(Math.random() * 2)
            let arg = args
            arg.splice(0, 1);
            const argsJoined = arg.join(' ');
            arg = argsJoined.split(',');
            message.channel.send(`${arg[randomNumber]} would win.`)
        } else {
            message.channel.send("Who do you even want to compare?????")
        }
    }
}