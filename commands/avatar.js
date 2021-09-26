const f = require('../functions.js');
const discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: f.localization("commands","avatar","exports").description,
    category: 'fun',
    modcommand: false,
    usage: f.localization("commands","avatar","exports").usage,
    perms: '',
    alias: ["av", "pfp", "profilepicture"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        if (args.length == 2) { // If a user could be pinged
            let user = message.mentions.users.first(); // Get the ping
            if (!user) { // If a user was pinged
                user = client.users.cache.get(args[1]) // Get user object from ping
                if (!user) return f.embed(message,"",f.config().colorInfo,f.localization("commands","avatar","deny"));    
            }
            // Generate the embed
            let embed = new discord.MessageEmbed()
                .setImage(user.avatarURL({
                    dynamic: true,
                    size: 4096
                }))
                .setTitle(f.localization("commands","avatar","avatar",[user.username]))
            message.reply({ embeds: [embed] }) // Send the embed
        } else { // If no user could be pinged
            let user = message.author; //  Get the user object

            // Generate the embed
            let embed = new discord.MessageEmbed()
                .setImage(user.avatarURL({
                    dynamic: true,
                    size: 4096
                }))
                .setTitle(f.localization("commands","avatar","avatar",[user.username]))
            message.reply({ embeds: [embed] }) // Send the embed
        }
    }
}