const functions = require('../functions.js');
const discord = require('discord.js');

const colourInfo = functions.config().messageColours.info;
const colourWarn = functions.config().messageColours.warn;

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    name: 'care',
    description: 'Check how many cares something has.',
    category: 'fun',
    modcommand: false,
    usage: 'care [anything]',
    perms: '',
    alias: ["cares"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        function checkCares(person, selfcare) {
            message.channel.send(`Checking ${person}'s cares...`).then((sendMessage) => {
                setTimeout(function () {
                    sendMessage.edit(`Accesing the care database...`).then((sendMessage) => {
                        setTimeout(function () {
                            sendMessage.edit(`Asking friends...`).then((sendMessage) => {
                                setTimeout(function () {
                                    sendMessage.edit(`Trying harder to get cares...`).then((sendMessage) => {
                                        setTimeout(function () {
                                            const randomNumber = Math.floor(Math.random() * 101)
                                            if (randomNumber == 0) {
                                                const messages = [`You got like -100 cares jk jk you got 0`, `cringe dude 0 cares????`, `you need more frineds dude`, `Obama didn't even care like bro you have 0 people who care`, `0 cares`, `1 care jk jk im capping you have -100 cares`, `even if you were god 0 people would have cared`, `not even the ping command would return something for you`]
                                                const randomCare = Math.floor(Math.random() * messages.length)
                                                sendMessage.edit(messages[randomCare])
                                            } else {
                                                if (selfcare) {
                                                    sendMessage.edit(`whoa dude crazy you got ${randomNumber} cares!!!!!!`)
                                                } else {
                                                    sendMessage.edit(`${person} got ${randomNumber} cares`)
                                                }
                                            }
                                        },randomInteger(600,900))
                                    });
                                },randomInteger(1000,1900))
                            },randomInteger(700,900))
                        },randomInteger(600,1300))
                    });
                }, randomInteger(1000,2000));
                
            });
        }
        if (args.length > 1) {
            checkCares(args[1])
        } else {
            checkCares(message.author.username,true)
        }
    }
}