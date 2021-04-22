const config = require("../config.json")
const discord = require("discord.js")
const db = require("../db")

let infoColor = config.messageColors.info

module.exports = {
    run: (client) => {
        client.on('messageDelete', async (message) => {

            // Create deleted message embed
            let deletedMessageEmbed = new discord.MessageEmbed()
                .setTitle('Message Deleted')
                .setColor(infoColor)
                .addField('Member', message.author)
                .addField('Channel', message.channel)
                .addField('Message', `\`\`\`${message.content || "* no content *"}\`\`\``)
                .setThumbnail(message.author.displayAvatarURL({
                    type: 'png',
                    dynamic: true
                }))

            try {
                // Query the db to find the logging channel of the guild
                let res = await db.query("SELECT (log_channel) FROM guilds WHERE guild_id=$1", [message.guild.id])

                // If the log channel was set
                if (res.rowCount) {
                    let logging_channel = res.rows[0].log_channel
                    if (logging_channel) {
                        // Search for the channel to a. send a message in it and b. check if it still exists
                        let channel = client.channels.cache.find(channel => channel.id == logging_channel)
                        if (channel) {
                            channel.send(deletedMessageEmbed)
                        }
                    }
                }

            } catch (err) {
                throw err; // Logging can be done here
            }
        })
    }
}