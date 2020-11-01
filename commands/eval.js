const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'eval',
    description: 'Does some JS shit',
    category: 'owner',
    usage: '<code>',
    perms: 'owner',
    alias: ["e"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        if (message.author.id == functions.config().special.owner) {
            const args = message.content.split(" ").slice(1);
            const clean = text => {
                if (typeof (text) === "string")
                    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
            }
            message.channel.send("Starting EVAL! :thumbsup:").then(function () {
                try {
                    const code = args.join(" ");
                    const start = process.hrtime()
                    let evaled = eval(code);
                    const stop = process.hrtime(start)

                    let sp = "`"

                    if (typeof evaled !== "string")
                        evaled = require("util").inspect(evaled);

                    let embed = new discord.MessageEmbed()
                        .addField("`EVAL`", "```xl\n" + clean(evaled) + "\n```")
                        //.setDescription("`" + clean(evaled), { code: "xl" } + " `")
                        .addField("`TIME`", "`" + (((stop[0] * 1e9) + stop[1])) / 1e6 + " ms.`")
                        .setColor(colourWarn)
                    message.channel.send(embed)
                        .catch(function () {
                            //functions.embed(message.channel,"Error",colourWarn,"The eval return vaule could not be displayed because the eval return vaule was over 1024 characters!")
                            let embed = new discord.MessageEmbed()
                                .addField("`EVAL`", "```xl\n" + "The eval return vaule could not be displayed because the eval return vaule was over 1024 characters!" + "\n```")
                                //.setDescription("`" + clean(evaled), { code: "xl" } + " `")
                                .addField("`TIME`", "`" + (((stop[0] * 1e9) + stop[1])) / 1e6 + " ms.`")
                                .setColor(colourWarn)
                            message.channel.send(embed)
                        });
                } catch (err) {
                    let embed = new discord.MessageEmbed()
                        .setTitle("")
                        .setDescription(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
                        .setColor(colourWarn)
                    message.channel.send(embed)
                }
            });

        } else {
            functions.embed(message.channel, "Error", colourWarn, "You do not have the Permission to execute this command!")
        }
    }
}