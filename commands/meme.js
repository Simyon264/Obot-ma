const f = require('../functions.js');
const discord = require('discord.js');
const randomBunny = require('random-bunny');

module.exports = {
    name: 'meme',
    description: f.localization("commands","meme","exports").description,
    category: 'fun',
    modcommand: false,
    usage: f.localization("commands","meme","exports").usage,
    perms: '',
    alias: ["m", "xd", "thefunny", "funny"],
    cooldown: 5,
    run: function (message, prefix, args, client) {
        const subreddits = [
            "memes",
            "dankmemes",
            "funny",
            "ComedyCemetery",
            "PrequelMemes",
            "okbuddyretard",
            "4PanelCringe",
            "FellowKids",
            "comedyhomicide",
            "HistoryMemes",
            "antimeme",
            "wholesomememes",
            "MinecraftMemes",
            "bonehurtingjuice",
            "comedyheaven"
        ]
        const filter = [
            "top",
            "hot"
        ]
        const randomFilter = filter[Math.floor(Math.random() * filter.length)]
        const randomNumber = f.randomInt(0,subreddits.length)
        randomBunny.randomBunny(subreddits[randomNumber], randomFilter, res => {
            const randomColor = Math.floor(Math.random() * 16777215).toString(16)
            let embed = new discord.MessageEmbed()
                .setTitle(res.title.substring(0, 256))
                .setURL(`https://reddit.com${res.permalink}`)
                .setImage(res.url)
                .setColor(randomColor)
                .setFooter(f.localization("commands","meme","source",[subreddits[randomNumber]]))
            message.reply({ embeds: [embed] })
        });
    }
}