const f = require('../functions.js');
const discord = require('discord.js');


function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    name: 'care',
    description: f.localization("commands","care","exports").description,
    category: 'fun',
    modcommand: false,
    usage: f.localization("commands","care","exports").usage,
    perms: '',
    alias: ["cares"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        function checkCares(person, selfcare) {
            message.channel.send(f.localization("commands","care","first",[person])).then((sendMessage) => {
                setTimeout(function () {
                    sendMessage.edit(f.localization("commands","care","second")).then((sendMessage) => {
                        setTimeout(function () {
                            sendMessage.edit(f.localization("commands","care","third")).then((sendMessage) => {
                                setTimeout(function () {
                                    sendMessage.edit(f.localization("commands","care","forth")).then((sendMessage) => {
                                        setTimeout(function () {
                                            const randomNumber = f.randomInt(0,100)
                                            if (randomNumber == 0) {
                                                const messages = f.localization("commands","care","messages")
                                                const randomCare = Math.floor(Math.random() * messages.length)
                                                sendMessage.edit(messages[randomCare])
                                            } else {
                                                if (selfcare) {
                                                    sendMessage.edit(f.localization("commands","care","selfcare",[randomNumber]))
                                                } else {
                                                    sendMessage.edit(f.localization("commands","care","othercare",[person,randomNumber]))
                                                }
                                            }
                                        }, randomInteger(600, 900))
                                    });
                                }, randomInteger(1000, 1900))
                            }, randomInteger(700, 900))
                        }, randomInteger(600, 1300))
                    });
                }, randomInteger(1000, 2000));
            });
        }
        if (args.length > 1) {
            checkCares(args[1])
        } else {
            checkCares(message.author.username, true)
        }
    }
}