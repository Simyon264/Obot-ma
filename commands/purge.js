const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
let colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'purge',
    description: 'Deletes a set amount of messages',
    category: 'moderation',
    usage: '<amount of messages>',
    perms: 'MANAGE_MESSAGES',
    cooldown: 25,
    run: function (message, prefix, args, client) {
        client.guilds.fetch(message.guild.id).then((guild) => {
            if (guild.me.permissions.has("MANAGE_MESSAGES")) {
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