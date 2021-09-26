const functions = require('../functions.js');
const colourWarn = functions.config().messageColours.warn;

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    name: 'vibecheck',
    description: "Checks a user's vibe.",
    category: 'fun',
    modcommand: false,
    usage: 'vibecheck [anything]',
    perms: '',
    alias: ["vibe","vbc"],
    cooldown: 3,
    run: function (message, prefix, args, client) {
        function checkVibe(person) {
            message.channel.send(`Checking ${person}'s vibe...`).then((sendMessage) => {
                setTimeout(function () {
                    const newMessage = ["Accessing the vibe database...", "Asking my friends...", "Checking the bro code...", "Finding evidence...", "Checking interactions...","Looking at past interactions..."]
                    let randomNumber = Math.floor(Math.random() * newMessage.length)
                    sendMessage.edit(newMessage[randomNumber]).then((sendMessage) => {
                        setTimeout(function () {
                            const newMessage = [`Asking the VibeCheckerClub:tm: for someone named ${person}...`, "Looking at past DM's...", "Accesesing bro code violations...",`Asking the Police...`]
                            randomNumber = Math.floor(Math.random() * newMessage.length)
                            sendMessage.edit(newMessage[randomNumber]).then((sendMessage) => {
                                setTimeout(function () {
                                    const newMessage = [`identifying Vibe...`,`Running the obama check...`,`Asking the judge...`,`Checking the music database...`,`Asking the VibeCity people for Vibe...`]
                                    randomNumber = Math.floor(Math.random() * newMessage.length)
                                    sendMessage.edit(newMessage[randomNumber]).then((sendMessage) => {
                                        setTimeout(function () {
                                            let failed = randomInteger(0, 10)
                                            if (failed >= 4) {
                                                randomNumber = randomInteger(0, 100)
                                                if (randomNumber <= 50) {
                                                    const youfailed = client.emojis.cache.get("820956980759363606").toString()
                                                    sendMessage.edit(`${person} failed the vibe check with ${randomNumber}%. ${youfailed}`)
                                                } else {
                                                    if (randomInteger(1, 200) == 69) {
                                                        const youAreSpecial = client.emojis.cache.get("788456334852096041").toString()
                                                        sendMessage.edit(`${person} passed the vibe check with xX420Xx%. ${youAreSpecial}`)
                                                        return
                                                    }
                                                    const pass = client.emojis.cache.get("820956980755693568").toString()
                                                    sendMessage.edit(`${person} passed the vibe check with ${randomNumber}%. ${pass}`)
                                                }
                                            } else {
                                                let embed = functions.embed(message.channel, "`🚨WARNING🚨`", colourWarn, `${person}'s Vibe has been identified in the VibeChecker™ database.\n${person} has missed their Vibe Court date multiple times. The Vibe Police will be here shortly.`,true)
                                                sendMessage.edit({content: "** **" ,embeds: [embed] })
                                            }
                                        }, randomInteger(1500, 2300))
                                    });
                                }, randomInteger(1500, 1900))
                            }, randomInteger(1900, 2400))
                        }, randomInteger(1000, 1300))
                    });
                }, randomInteger(1000, 2000));

            });
        }
        if (args.length > 1) {
            checkVibe(args[1])
        } else {
            checkVibe(message.author.username)
        }
    }
}