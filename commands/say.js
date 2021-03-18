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
            if (messageToSay.includes("@")) message.channel.send("UwU you are my favorite owner and i would do anything for you but my creator forbid me from inlcuding @ in my messages!!! :( btw could you please punch me harder oh daddy pls"); return;
            message.channel.send(messageToSay)
        } else {
            message.channel.send("UwU daddy i wanted to say that but its too long just like your-")
        }
        
    }
}