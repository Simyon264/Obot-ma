try {
    const functions = require("../functions.js")
    const discord = require('discord.js');

    var colourInfo = functions.config().messageColours.info;
    var colourWarn = functions.config().messageColours.warn;

    module.exports = {
        run: function (client) {
            client.on('messageDelete', (message) => {
                try {
                    if (message.author.bot) return;

                    var embed = new discord.MessageEmbed()
                        .setTitle("Message Deleted")
                        .setColor(colourInfo)
                        .addField("User", `${message.author} \`${message.author.tag}\``)
                        .addField("Channel", message.channel)
                        .addField("Content", `\`\`\`${message.content || "*none*"}\`\`\``)
                        .setThumbnail(message.author.displayAvatarURL);

                    if (typeof message.guild.channels.cache.find(channel => channel.id == functions.getServerConfig(message.guild.id).logging) !== 'undefined' && message.guild.channels.cache.find(channel => channel.id == functions.getServerConfig(message.guild.id).logging)) {
                        message.guild.channels.cache.find(channel => channel.id == functions.getServerConfig(message.guild.id).logging).send(embed);
                    }
                } catch (error) {
                    const colors = require("colours")
                    const fs = require('fs')
                    const path = require('path');

                    let error2 = `${error}\n\n${error.stack}`

                    let date = new Date()

                    let finnal = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getSeconds() + "_" + module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
                    //let finnal = `${date.getDate}_${date.getMonth}_${date.getFullYear}:${date.getSeconds}:${module.filename}.txt`
                    fs.writeFileSync(`./files/log/${finnal}.txt`, error2)
                    console.log(colors.red(`An error occured! The error can be found in ./files/log/${finnal}.txt`))
                }
            });
        }
    }
} catch (error) {
    const colors = require("colours")
    const fs = require('fs')
    const path = require('path');

    let error2 = `${error}\n\n${error.stack}`

    let date = new Date()

    let finnal = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getSeconds() + "_" + module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
    //let finnal = `${date.getDate}_${date.getMonth}_${date.getFullYear}:${date.getSeconds}:${module.filename}.txt`
    fs.writeFileSync(`./files/log/${finnal}.txt`, error2)
    console.log(colors.red(`An error occured! The error can be found in ./files/log/${finnal}.txt`))
}