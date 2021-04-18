const f = require('../functions.js');
const discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of the mentioned user',
    category: 'fun',
    modcommand: false,
    usage: 'avatar <user>',
    perms: '',
    alias: ["av", "pfp", "profilepicture"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        if (args.length == 2) { // If a user could be pinged
            let user = message.mentions.users.first(); // Get the ping
            if (!user) { // If a user was pinged
                try {
                    user = client.users.cache.get(args[1]) // Get user object from ping
                } catch (e) {
                    return f.embed('Please specify a user.');
                }

            }
            // Generate the embed
            let embed = new discord.MessageEmbed()
                .setImage(user.avatarURL({
                    dynamic: true,
                    size: 4096
                }))
                .setTitle(`${user.username}'s avatar`)
            message.channel.send(embed) // Send the embed
        } else { // If no user could be pinged
            let user = message.author; //  Get the user object

            // Generate the embed
            let embed = new discord.MessageEmbed()
                .setImage(user.avatarURL({
                    dynamic: true,
                    size: 4096
                }))
                .setTitle(`${user.username}'s avatar`)
            message.channel.send(embed) // Send the embed
        }
    }
}