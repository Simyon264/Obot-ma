const config = require('../config.json');
const functions = require("../functions.js")
const discord = require('discord.js');
const colors = require("colours")

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
var colourMember = functions.config().messageColours.member;

module.exports = {
    run: function(client) {
        client.on('error', (error) => {
            console.log(colors.red("A Client error occured: " + error))
        });
    }
}