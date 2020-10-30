const config = require('../config.json');
const functions = require("../functions.js")
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
var colourMember = functions.config().messageColours.member;

module.exports = {
    run: function(client) {
        client.on('guildMemberAdd', (member) => {
            let guild = member.guild;
            if (!guild.available) return;
            var embed = new discord.MessageEmbed()
                .setTitle("Member Joined")
                .setColor(colourMember)
                .addField("User", `${member} \`${member.user.tag}\``)
                .addField("Created", `${member.user.createdAt}`)
                .setFooter(`User ID: ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL({ type: 'png', dynamic: true }));
            client.channels.cache.find(channel => channel.id === functions.getServerConfig(guild.id).logging).send(embed)
        });
    }
}