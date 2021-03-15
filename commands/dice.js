const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'dice',
    description: 'Roll the dice.',
    category: 'fun',
    modcommand: false,
    usage: 'dice [min],[max]',
    perms: '',
    alias: ["randomnumber", "rn"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        if (args.length == 2) {
            let arg = args
            arg.splice(0, 1);
            const argsJoined = arg.join(' ');
            arg = argsJoined.split(',');
            args = arg
            if (typeof args[1] !== 'undefined') {
                const randomNumber = getRandomInt(args[0], args[1])
                message.channel.send(`:game_die: ${randomNumber}`)
            } else {
                const randomNumber = Math.floor(Math.random() * 6)
                message.channel.send(`:game_die: ${randomNumber}`)
            }  
        } else {
            const randomNumber = Math.floor(Math.random() * 6)
            message.channel.send(`:game_die: ${randomNumber}`)
        }
    }
}