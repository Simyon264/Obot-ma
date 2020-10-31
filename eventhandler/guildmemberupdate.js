try {
    const functions = require("../functions.js")
    const discord = require('discord.js');

    var colourInfo = functions.config().messageColours.info;
    var colourWarn = functions.config().messageColours.warn;

    module.exports = {
        run: function (client) {
            client.on('guildMemberUpdate', (oldMember, newMember) => {
                try {
                    if (oldMember.nickname != newMember.nickname) {
                        let memberName = newMember.user.tag;
                        let oldNickname = oldMember.nickname || "*none*";
                        let newNickname = newMember.nickname || "*none*";

                        var embed = new discord.MessageEmbed()
                            .setTitle("Nickname Changed")
                            .setColor(colourInfo)
                            .addField("User", `${newMember} \`${newMember.user.tag}\``)
                            .addField("Old Nickname", oldNickname)
                            .addField("New Nickname", newNickname)
                            .setFooter(`User ID: ${newMember.user.id}`)
                            .setThumbnail(newMember.user.displayAvatarURL);

                        newMember.guild.channels.cache.find(channel => channel.id == functions.getServerConfig(newMember.guild.id).logging).send(embed);
                    }
                } catch (error) {
                    const colors = require("colours")
                    const fs = require('fs')
                    const path = require('path');

                    let date = new Date()

                    let finnal = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getSeconds() + "_" + module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
                    //let finnal = `${date.getDate}_${date.getMonth}_${date.getFullYear}:${date.getSeconds}:${module.filename}.txt`
                    fs.writeFileSync(`./files/log/${finnal}.txt`, error)
                    console.log(colors.red(`An error occured! The error can be found in ./files/log/${finnal}.txt`))
                }
            });
        }
    }
} catch (error) {
    const colors = require("colours")
    const fs = require('fs')
    const path = require('path');

    let date = new Date()

    let finnal = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getSeconds() + "_" + module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
    //let finnal = `${date.getDate}_${date.getMonth}_${date.getFullYear}:${date.getSeconds}:${module.filename}.txt`
    fs.writeFileSync(`./files/log/${finnal}.txt`, error)
    console.log(colors.red(`An error occured! The error can be found in ./files/log/${finnal}.txt`))
}