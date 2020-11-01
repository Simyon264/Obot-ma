const functions = require('../functions.js');
const fs = require('fs');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
var colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'credit',
    description: 'Gives credit to other code or moduels used in the bot',
    category: 'general',
    usage: '',
    perms: '',
    alias: [],
    cooldown: 1,
    run: function (message, prefix, args) {
        let embed = new discord.MessageEmbed()
            .setTitle("Credit")
            .setDescription("Other code and npm packages used")
            .setColor(colourDone)
            .addField("VylBot", "[VylBot on github](https://github.com/GetGravitySoft/VylBot 'Click me >.<')", false)
            .addField("Discord.js docs", "[Docs](https://discordjs.guide/ 'Click me >.<')")
            .addField("NPM Packages", "[Colours](https://www.npmjs.com/package/colors 'Click me >.<') , [Discord.js](https://www.npmjs.com/package/discord.js 'Click me >.<') , [random-puppy](https://www.npmjs.com/package/random-puppy 'Click me >.<')")
        message.channel.send(embed)
    }
}