const fs = require('fs')
const discord = require('discord.js')
exports.config = function (config) {
    try {
        return (JSON.parse(fs.readFileSync("./files/important files/config.json")))
    } catch (error) {
        console.log("Error: Config file missing or damaged!")
    }
}

exports.embed = function (channel, title, colour, message, returnEmbedOnly) {
    if (!returnEmbedOnly) {
        var embed = new discord.MessageEmbed()
            .setTitle(title)
            .setColor(colour)
            .setDescription(message);

        channel.send(embed);
    } else {
        var embed = new discord.MessageEmbed()
            .setTitle(title)
            .setColor(colour)
            .setDescription(message);
        return embed;
    }
}


exports.getServerConfig = function (guildID) {
    try {
        let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${guildID}.json`))
        return file;
    } catch (error) {
        return JSON.parse(fs.readFileSync("./files/serverConfigs/template.json"))
    }
}