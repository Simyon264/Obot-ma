const functions = require('../functions.js');
const fs = require('fs');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
var colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'disableCommand',
    description: 'Disables or enables a command!',
    category: 'moderation',
    usage: '',
    perms: 'MANAGE_GUILD',
    alias: ["dc"],
    cooldown: 1,
    run: function (message, prefix, args) {
        
    }
}