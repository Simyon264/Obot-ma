const discord = require('discord.js');
const fs = require('fs')
const config = require("../config.json")

const warnColor = config.messageColors?.warn || "0xf54242"

module.exports = {
    name: 'eval',
    about: 'Does some JS shit',
    category: 'owner',
    usage: 'e <code>',
    perms: '',
    aliases: ["e"],
    cooldown: 1000, // milliseconds
    run: function (client, message, args) {
        if (message.author.id == "820076794320257094") {
            // I have no idea how this works
            const clean = text => {
                if (typeof (text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            }
            message.channel.send("Starting EVAL! :thumbsup:").then(function () {
                try {
                    const code = args;
                    const start = process.hrtime()
                    let evaled = eval(code);
                    const stop = process.hrtime(start)

                    if (typeof evaled !== "string")
                        evaled = require("util").inspect(evaled);

                    let embed = new discord.MessageEmbed()
                        .addField("`EVAL`", "```xl\n" + clean(evaled) + "\n```")
                        //.setDescription("`" + clean(evaled), { code: "xl" } + " `")
                        .addField("`TIME`", "`" + (((stop[0] * 1e9) + stop[1])) / 1e6 + " ms.`")
                        .setColor(warnColor)
                    message.channel.send(embed)
                        .catch(function () {
                            let embed = new discord.MessageEmbed()
                                .addField("`EVAL`", "```xl\n" + "The eval return vaule could not be displayed because the eval return vaule was over 1024 characters! Im going to send the return as its own file!" + "\n```")
                                .addField("`TIME`", "`" + (((stop[0] * 1e9) + stop[1])) / 1e6 + " ms.`")
                                .setColor(warnColor)
                            message.channel.send(embed)
                            fs.writeFileSync("./evalreturn.txt", clean(evaled))
                            message.channel.send({
                                files: [{
                                    attachment: './evalreturn.txt',
                                    name: 'evalreturn.txt'
                                }]
                            }).catch(() => {
                                message.channel.send("Bruhhhh the return was prob over 8mb... bruv wtf were you doing")
                            });
                        });
                } catch (err) {
                    let embed = new discord.MessageEmbed()
                        .setTitle("")
                        .setDescription(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
                        .setColor(warnColor)
                    message.channel.send(embed)
                }
            });

        } else message.channel.send('you really think im that stopid?')
    }
}