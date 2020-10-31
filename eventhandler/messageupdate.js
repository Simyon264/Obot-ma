try {
    const functions = require("../functions.js");
    const discord = require("discord.js");

    var colourInfo = functions.config().messageColours.info;
    var colourWarn = functions.config().messageColours.warn;

    module.exports = {
        run: function (client) {
            client.on('messageUpdate', (oldMessage, newMessage) => {
                try {
                    if (newMessage.author.bot) return;
                    if (oldMessage.content == newMessage.content) return;
                    let guild = newMessage.guild
                    if (!guild.available) return;

                    var embed = new discord.MessageEmbed()
                        .setTitle("Message Edited")
                        .setColor(colourInfo)
                        .addField("User", `${newMessage.author} \`${newMessage.author.tag}\``)
                        .addField("Channel", newMessage.channel)
                        .addField("Old Content", `\`\`\`${oldMessage.content || "*none*"}\`\`\``)
                        .addField("New Content", `\`\`\`${newMessage.content || "*none*"}\`\`\``)
                        .setThumbnail(newMessage.author.displayAvatarURL);

                    newMessage.guild.channels.cache.find((channel) => {
                        if (channel.id == functions.getServerConfig(guild.id).logging) {
                            channel.send(embed)
                        }
                    });
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