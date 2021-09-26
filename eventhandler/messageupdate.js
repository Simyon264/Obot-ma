const f = require("../functions.js");
const discord = require("discord.js");


module.exports = {
    run: function (client) {
        client.on('messageUpdate', (oldMessage, newMessage) => {
            try {
                f.log("Message was updated.")

                const colourInfo = f.config().messageColours.info;

                if (newMessage.author.bot) return f.log("Message author is a bot."); // Check if message author is a bot.
                if (oldMessage.content == newMessage.content) return f.log("Message content hasn't been updated."); // Check if message content has been updated.
                let guild = newMessage.guild
                if (!guild.available) return f.log("Guild is unavailable.");
                // Generate the embed.
                let embed = new discord.MessageEmbed()
                    .setTitle("Message Edited")
                    .setColor(colourInfo)
                    .addField("User", `${newMessage.author} \`${newMessage.author.tag}\``)
                    .addField("Channel", newMessage.channel.name)
                    .addField("Old Content", `\`\`\`${oldMessage.content || "*none*"}\`\`\``)
                    .addField("New Content", `\`\`\`${newMessage.content || "*none*"}\`\`\``)
                    .setThumbnail(newMessage.author.displayAvatarURL);

                // Find the log channel.
                newMessage.guild.channels.cache.find((channel) => {
                    if (channel.id == f.getServerConfig(guild.id).logging) {
                        // Send the embed
                        channel.send(embed)
                    }
                });
            } catch (error) {
                f.error(error, "messageupdate.js", true)
            }
        });
    }
}