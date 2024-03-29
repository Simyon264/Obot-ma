const functions = require('../functions.js');
const discord = require('discord.js');
const randomBunny = require('random-bunny');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'meme',
    description: 'Gives you a meme!',
    category: 'fun',
    modcommand: false,
    usage: 'meme',
    perms: '',
    alias: ["m","xd","thefunny","funny"],
    cooldown: 5,
    run: function (message, prefix, args, client) {
        const subreddits = ["memes", "dankmemes", "funny", "ComedyCemetery", "PrequelMemes", "okbuddyretard", "4PanelCringe", "FellowKids", "terriblefacebookmemes", "comedyhomicide", "Cringetopia", "HolUp", "HistoryMemes", "antimeme", "wholesomememes", "MakeMeSuffer", "MinecraftMemes", "suicidebywords", "bonehurtingjuice", "comedyheaven", "MurderedByWords"]
        const randomNumber = Math.floor(Math.random() * subreddits.length)
        randomBunny(subreddits[randomNumber], 'new', res => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
                let embed = new discord.MessageEmbed()
                    .setTitle(res.title)
                    .setURL(`https://reddit.com${res.permalink}`)
                    .setImage(res.url)
                    .setColor(randomColor)
                    .setFooter(`This is from r/${subreddits[randomNumber]}`)
                message.channel.send(embed);
        });
    }
}