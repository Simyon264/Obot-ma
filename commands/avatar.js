const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of the mentioned user',
    category: 'fun',
    usage: 'avatar <user>',
    perms: '',
    alias: ["av", "pfp", "profilepicture"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        if (args.length == 2) {
            let user = message.mentions.users.first();
            if (!user) {
                try {
                    user = client.users.cache.get(args[1])
                } catch (e) {
                    functions.embed(message.channel, "Error", colourWarn, "Please specify a user!")
                    return;
                }
                
            }
            let embed = new discord.MessageEmbed()
                .setImage(user.avatarURL({
                    dynamic: true,
                    size: 4096
                }))
                .setTitle(`${user.username}'s avatar`)
            message.channel.send(embed)
        } else {
            functions.embed(message.channel, "Error", colourWarn, "Please specify a user!")
        }
    }
}