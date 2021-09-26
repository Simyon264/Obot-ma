const f = require('../functions.js');
const discord = require('discord.js');

const colourWarn = f.config().messageColours.warn;
const colourDone = f.config().messageColours.done;

module.exports = {
    name: 'purge',
    description: f.localization("commands","purge","exports").description,
    category: 'moderation',
    modcommand: true,
    usage: f.localization("commands","purge","exports").usage,
    perms: 'MANAGE_MESSAGES',
    alias: ["clear", "massdelete"],
    cooldown: 25,
    run: function (message, prefix, args, client) {
        /*/
        /-----------------------------------------------\
        | I have no idea how to make this better lmao   |
        |                     hf                        |
        \-----------------------------------------------/
        /*/
        client.guilds.fetch(message.guild.id).then((guild) => { // Get the guild
            if (guild.me.permissions.has("MANAGE_MESSAGES")) { // Check if the bot has enough perms
                if (args.length == 2) {
                    if (!isNaN(args[1])) {
                        if (args[1] < 1) {
                            f.embed(message, f.localization("commands","purge","error"), colourWarn, f.localization("commands","purge","noargs"))
                        } else {
                            if (args[1] <= 101) {
                                message.channel.bulkDelete(args[1]).then(() => {
                                    f.embed(message, f.localization("commands", "purge", "done"), colourDone, f.localization("commands", "purge", "succ", [args[1]]))
                                })
                            } else if (args[1] > 100 && args[1] <= 200) {
                                message.channel.bulkDelete(100).then(() => {
                                    setTimeout(() => {
                                        message.channel.bulkDelete(args[1] - 100).then(() => {
                                            f.embed(message, f.localization("commands","purge","done"), colourDone, f.localization("commands","purge","succ",[args[1]]))
                                        });
                                    }, 200);
                                });
                            } else if (args[1] > 200 && args[1] <= 300) {
                                message.channel.bulkDelete(100).then(() => {
                                    setTimeout(() => {
                                        message.channel.bulkDelete(100).then(() => {
                                            setTimeout(() => {
                                                message.channel.bulkDelete(args[1] - 200).then(() => {
                                                    f.embed(message, f.localization("commands","purge","done"), colourDone, f.localization("commands","purge","succ",[args[1]]))
                                                })
                                            }, 200);
                                        });
                                    }, 200);
                                });
                            } else if (args[1] > 300 && args[1] <= 400) {
                                message.channel.bulkDelete(100).then(() => {
                                    setTimeout(() => {
                                        message.channel.bulkDelete(100).then(() => {
                                            setTimeout(() => {
                                                message.channel.bulkDelete(100).then(() => {
                                                    setTimeout(() => {
                                                        message.channel.bulkDelete(args[1] - 300).then(() => {
                                                            f.embed(message, f.localization("commands","purge","done"), colourDone, f.localization("commands","purge","succ",[args[1]]))
                                                        })
                                                    }, 200);
                                                })
                                            }, 200);
                                        });
                                    }, 200);
                                });
                            } else if (args[1] > 400 && args[1] <= 500) {
                                message.channel.bulkDelete(100).then(() => {
                                    setTimeout(() => {
                                        message.channel.bulkDelete(100).then(() => {
                                            setTimeout(() => {
                                                message.channel.bulkDelete(100).then(() => {
                                                    setTimeout(() => {
                                                        message.channel.bulkDelete(100).then(() => {
                                                            setTimeout(() => {
                                                                message.channel.bulkDelete(args[1] - 400).then(() => {
                                                                    f.embed(message, f.localization("commands","purge","done"), colourDone, f.localization("commands","purge","succ",[args[1]]))
                                                                })
                                                            }, 200);
                                                        })
                                                    }, 200);
                                                })
                                            }, 200);
                                        });
                                    }, 200);
                                });
                            } else {
                                f.embed(message, f.localization("commands","purge","error"), colourWarn, f.localization("commands","purge","error"))
                            }
                        }
                    } else {
                        f.embed(message, f.localization("commands","purge","error"), colourWarn, f.localization("commands","purge","noargs"))
                    }
                } else {
                    f.embed(message, f.localization("commands","purge","error"), colourWarn, f.localization("commands","purge","noargs"))
                }
            } else {
                f.embed(message,f.localization("commands","purge","error"), colourWarn, f.localization("commands","purge","nopermsbot"))
            }
        })
    }
}