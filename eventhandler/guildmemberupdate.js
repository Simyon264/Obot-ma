const f = require("../functions.js")
const discord = require('discord.js');

var colourInfo = f.config().messageColours.info;

module.exports = {
    run: function (client) {
        client.on('guildMemberUpdate', (oldMember, newMember) => {
            try {
                f.log('Member has been updated.')
                if (oldMember.nickname != newMember.nickname) { // Check if nick was changed.
                    let memberName = newMember.user.username; // Get the member name
                    f.log(`Member: ${memberName}`)

                    // Get the old and new nick
                    let oldNickname = oldMember.nickname || "*none*";
                    let newNickname = newMember.nickname || "*none*";

                    // Generate the embed
                    let embed = new discord.MessageEmbed()
                        .setTitle("Nickname Changed")
                        .setColor(colourInfo)
                        .addField("User", `${newMember} \`${newMember.user.tag}\``)
                        .addField("Old Nickname", oldNickname)
                        .addField("New Nickname", newNickname)
                        .setFooter(`User ID: ${newMember.user.id}`)
                        .setThumbnail(newMember.user.displayAvatarURL);

                    // Sending the message
                    const query = newMember.guild.channels.cache.find(channel => channel.id == f.getServerConfig(newMember.guild.id).logging)
                    if (typeof query !== 'undefined' && query) {
                        query.send(embed)
                        f.log("Message was sent.")
                    } else f.log("Message was not sent, log channel not definded.")

                } else f.log('Member nick has not been changed.')
            } catch (error) {
                false
            }
        });
    }
}