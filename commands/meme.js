const functions = require('../functions.js');
const discord = require('discord.js');
const randomPuppy = require('random-puppy');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'meme',
    description: 'Gives you a meme!',
    category: 'fun',
    usage: '',
    perms: '',
    alias: ["m"],
    cooldown: 5,
    run: function (message, prefix, args, client) {
        function lol() {
            randomPuppy("memes").then((url) => {
                const randomColor = Math.floor(Math.random() * 16777215).toString(16)
                let = callLOL = false
                if (url.includes(".mp4")) {
                    callLOL = true
                }
                if (!callLOL) {
                    let embed = new discord.MessageEmbed()
                        .setTitle("")
                        .setImage(url)
                        .setColor(randomColor)
                    message.channel.send(embed);
                } else {
                    lol()
                }
            });
        }
        lol();
    }
}