const f = require("../functions.js")
const discord = require('discord.js');


module.exports = {
    run: function (client) {
        client.on('guildMemberRemove', (member) => {
            try {
                f.log('Guild member left.')
                const colourMember = f.config().messageColours.member;

                // Generating embed
                let embed = new discord.MessageEmbed()
                    .setTitle("Member Left")
                    .setColor(colourMember)
                    .addField("User", `${member} \`${member.user.tag}\``)
                    .addField("Joined", `${member.joinedAt}`)
                    .setFooter(`User ID: ${member.user.id}`)
                    .setThumbnail(member.user.displayAvatarURL);

                // Sending the message
                const query = member.guild.channels.cache.find(channel => channel.id == f.getServerConfig(member.guild.id).logging)
                if (typeof query !== 'undefined' && query) {
                    query.send(embed)
                    f.log('Message sent.');
                } else f.log("Message was not sent, log channel not definded.");

            } catch (error) {
                f.error(error, "guildmemberremove.js", true)
            }
        });
    }
}