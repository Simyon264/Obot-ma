const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'server',
    description: 'Displays the server info.',
    category: 'general',
    modcommand: false,
    usage: 'serverinfo',
    perms: '',
    alias: ["sinfo", "server", "server-info"],
    cooldown: 3,
    run: function (message, prefix, args, client) {
        let guild = message.guild

        let normalEmojis = 0
        let animatedEmojis = 0

    
        let guildEmojiCache = guild.emojis.cache.array()
        for (let index = 0; index < guildEmojiCache.length; index++) {
            if (guildEmojiCache[index].animated == true) animatedEmojis++;
            if (guildEmojiCache[index].animated == false) normalEmojis++;
        }

        let humans = 0
        let robots = 0

        let guildMemberArr = guild.members.cache.array()
        for (let index = 0; index < guildMemberArr.length; index++) {
            if (guildMemberArr[index].user.bot) robots++;
            if (guildMemberArr[index].user.bot == false) humans++;
        }

        let cAt = guild.createdAt

        let fields = [{
            name: "General",
            value: `**› Name:** ${guild.name}\n**› ID:** ${guild.id}\n**› Owner:** <@${guild.owner.id}>\n**› Region:** ${guild.region}\n**› Boost tier:** Tier ${guild.premiumTier}\n**› Verification Level:** ${guild.verificationLevel}\n**› Created at:** ${cAt.getHours()}:${cAt.getMinutes()} ${cAt.getDate()}.${cAt.getMonth()}.${cAt.getFullYear()}\n`,
            inline: true
        }, {
            name: "Stats",
            value: `**› Role Count:** ${guild.roles.cache.array().length}\n**› Emojis:** ${normalEmojis}\n**› Animated Emojis:** ${animatedEmojis}\n**› Member Count:** ${guild.memberCount}\n**› Humans:** ${humans}\n**› Bots:** ${robots}\n**› Boost Count:** ${guild.premiumSubscriptionCount}\n`,
            inline: true
        }]

        let embed = new discord.MessageEmbed()
            .setThumbnail(guild.iconURL({
                dynamic: true,
                size: 128
            }))
            .setTitle(`${guild.name}`)
            .addFields(fields)
            .setColor(colourInfo)
        message.channel.send(embed);
    }
}