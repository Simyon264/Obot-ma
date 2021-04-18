const f = require("../functions.js")
const discord = require('discord.js');


module.exports = {
    run: function (client) {
        client.on('guildMemberAdd', (member) => {
            try {
                const colourMember = f.config().messageColours.member;

                f.log('Member joined.')
                let guild = member.guild; // Getting the guild
                if (!guild.available) return f.log('Guild is not available, returning.');

                // Generating the embed
                let embed = new discord.MessageEmbed()
                    .setTitle("Member Joined")
                    .setColor(colourMember)
                    .addField("User", `${member} \`${member.user.tag}\``)
                    .addField("Created", `${member.user.createdAt}`)
                    .setFooter(`User ID: ${member.user.id}`)
                    .setThumbnail(member.user.displayAvatarURL({
                        type: 'png',
                        dynamic: true
                    }));

                // Sending the message
                const query = client.channels.cache.find(channel => channel.id === f.getServerConfig(guild.id).logging)
                if (typeof query !== 'undefined' && query) {
                    query.send(embed)
                    f.log('Message sent.')
                } else f.log("Message was not sent, log channel not definded.");
            } catch (error) {
                f.error(error, "guildmemberadd.js", true)
            }
        });
    }
}