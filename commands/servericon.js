const discord = require('discord.js');

module.exports = {
    name: 'servericon',
    description: 'Shows the server icon',
    category: 'server',
    usage: 'servericon',
    modcommand: false,
    perms: '',
    alias: ["icon", "si"],
    cooldown: 5,
    run: function (message, prefix, args, client) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16) // Generate random color
        let embed = new discord.MessageEmbed() // Generate embed
            .setTitle(`Server icon for ${message.guild.name}`)
            .setImage(message.guild.iconURL({
                size: 4096,
                dynamic: true
            }))
            .setColor(randomColor)
        message.reply({ embeds: [embed] })
    }
}