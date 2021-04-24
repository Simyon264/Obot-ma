const config = require("../config.json")
const discord = require("discord.js")
const db = require("../db")

let memberColor = config.messageColors.member

module.exports = {
    run: (client) => {
        client.on('guildMemberAdd', async (member) => {
            // Get the time
            let today = new Date().toString()

            // Create joined message mebed
            let joinedMessageEmbed = new discord.MessageEmbed()
                .setTitle(`Hello, ${member.user.username}`)
                .setColor(memberColor)
                .addField('Member', member)
                .addField('Joined', today)
                .addField('Created', member.user.createdAt)
                .setFooter(`ID: ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL({
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
                            channel.send(joinedMessageEmbed)
                        }
                    }
                }

            } catch (err) {
                throw err; // Logging can be done here
            }
        })
    }
}