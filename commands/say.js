const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'say',
    description: 'Make the bot say something',
    category: 'general',
    modcommand: false,
    usage: 'say <what you want the bot to say>',
    perms: '',
    alias: [],
    cooldown: 5,
    run: function (message, prefix, args, client) {
        let messageToSay = args;
        messageToSay.splice(0, 1);

        // Join the array into a string
        messageToSay = messageToSay.join(" ");
        if (messageToSay.length <= 1000) {
            message.channel.send(messageToSay)
        } else {
            message.channel.send("UwU daddy i wanted to say that but its too long just like your-")
        }
        
    }
}