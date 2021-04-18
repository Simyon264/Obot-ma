const f = require("../functions.js")
const discord = require('discord.js');

module.exports = {
    run: function (client) {
        client.on('messageDelete', (message) => {
            try {
                f.log('Message was deleted.')
                const colourInfo = f.config().messageColours.info; // Getting the info color

                // Generating the embed
                let embed = new discord.MessageEmbed()
                    .setTitle("Message Deleted")
                    .setColor(colourInfo)
                    .addField("User", `${message.author} \`${message.author.tag}\``)
                    .addField("Channel", message.channel)
                    .addField("Content", `\`\`\`${message.content || "*none*"}\`\`\``)
                    .setThumbnail(message.author.displayAvatarURL);

                // Sending the message
                if (typeof message.guild.channels.cache.find(channel => channel.id == f.getServerConfig(message.guild.id).logging) !== 'undefined' && message.guild.channels.cache.find(channel => channel.id == functions.getServerConfig(message.guild.id).logging)) {
                    message.guild.channels.cache.find(channel => channel.id == f.getServerConfig(message.guild.id).logging).send(embed);
                    f.log("Message was sent.")
                } else f.log("Message was not sent, log channel not definded.")
            } catch (error) {
                f.error(error, "messagedelete.js", true)
            }
        });
    }
}