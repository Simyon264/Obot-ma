const config = require("../config.json")
const discord = require("discord.js")
const db = require("../db")

let infoColor = config.messageColors.info

module.exports = {
    run: (client) => {
        client.on('messageUpdate', async (oldMessage, newMessage) => {

            // Don't do anything if a bot edited a message or if an edited message is the same as an old one
            if (newMessage.author.bot || newMessage.content == oldMessage.content) {
                return;
            }

            // Create edited message embed
            let messageEditedEmbed = new discord.MessageEmbed()
                .setTitle('Message Edited')
                .setColor(infoColor)
                .addField('Member', newMessage.author)
                .addField('Channel', newMessage.channel)
                .addField('Old', `\`\`\`${oldMessage.content || "* no content *"}\`\`\``)
                .addField('New', `\`\`\`${newMessage.content || "* no content *"}\`\`\``)
                .setThumbnail(newMessage.author.displayAvatarURL({
                    type: 'png',
                    dynamic: true
                }))

            try {
                // Query the db to find the logging channel of the guild
                let res = await db.query("SELECT (log_channel) FROM guilds WHERE guild_id=$1", [member.guild.id])

                // If the log channel was set
                if (res.rowCount) {
                    let logging_channel = res.rows[0].log_channel
                    if (logging_channel) {
                        // Search for the channel to a. send a message in it and b. check if it still exists
                        let channel = client.channels.cache.find(channel => channel.id == logging_channel)
                        if (channel) {
                            channel.send(messageEditedEmbed)
                        }
                    }
                }

            } catch (err) {
                throw err; // Logging can be done here
            }
        })
    }
}