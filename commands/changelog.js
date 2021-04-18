const discord = require('discord.js');
const fs = require("fs")

module.exports = {
    name: 'changelog',
    description: 'Displays the changelog',
    category: 'general',
    modcommand: false,
    usage: 'changelog',
    perms: '',
    alias: [],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        const colourInfo = f.config().messageColours.info;

        let embed = new discord.MessageEmbed()
            .setTitle("Changelog")
            .setColor(colourInfo)
            .setDescription(fs.readFileSync("./files/important files/changelog.txt", ))
            .setThumbnail(client.user.avatarURL())
        //.addField("Invite", `[Here](${functions.config().bot.invite} 'Click me to invite me!')`)
        message.channel.send(embed);
    }
}