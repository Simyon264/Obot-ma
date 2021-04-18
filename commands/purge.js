const functions = require('../functions.js');
const discord = require('discord.js');

const colourWarn = functions.config().messageColours.warn;
const colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'purge',
    description: 'Deletes a set amount of messages',
    category: 'moderation',
    modcommand: true,
    usage: 'purge <amount of messages>',
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
                            functions.embed(message.channel, "Error", colourWarn, "Please specify the amount of messages to delete (Max is 500)")
                        } else {
                            if (args[1] <= 101) {
                                message.channel.bulkDelete(args[1]).then(() => {
                                    functions.embed(message.channel, "Done!", colourDone, `Success, ${args[1]} messages have beem removed!`)
                                })
                            } else if (args[1] > 100 && args[1] <= 200) {
                                message.channel.bulkDelete(100).then(() => {
                                    setTimeout(() => {
                                        message.channel.bulkDelete(args[1] - 100).then(() => {
                                            functions.embed(message.channel, "Done!", colourDone, `Success, ${args[1]} messages have beem removed!`)
                                        });
                                    }, 200);
                                });
                            } else if (args[1] > 200 && args[1] <= 300) {
                                message.channel.bulkDelete(100).then(() => {
                                    setTimeout(() => {
                                        message.channel.bulkDelete(100).then(() => {
                                            setTimeout(() => {
                                                message.channel.bulkDelete(args[1] - 200).then(() => {
                                                    functions.embed(message.channel, "Done!", colourDone, `Success, ${args[1]} messages have beem removed!`)
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
                                                            functions.embed(message.channel, "Done!", colourDone, `Success, ${args[1]} messages have beem removed!`)
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
                                                                    functions.embed(message.channel, "Done!", colourDone, `Success, ${args[1]} messages have beem removed!`)
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
                                functions.embed(message.channel, "Error", colourWarn, "Please specify the amount of messages to delete (Max is 500)")
                            }
                        }
                    } else {
                        functions.embed(message.channel, "Error", colourWarn, "Please specify the amount of messages to delete (Max is 500)")
                    }
                } else {
                    functions.embed(message.channel, "Error", colourWarn, "Please specify the amount of messages to delete (Max is 500)")
                }
            } else {
                functions.embed(message.channel, "Error", colourWarn, "I need `MANAGE_MESSAGES` permission to execute this command.")
            }
        })
    }
}