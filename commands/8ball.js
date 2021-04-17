const functions = require('../functions.js');
const discord = require('discord.js');

const colourInfo = functions.config().messageColours.info;

module.exports = {
    name: '8ball',
    description: 'Ask a question and the magic 8ball will answer you!',
    category: 'fun',
    modcommand: false,
    usage: '8ball <question>',
    perms: '',
    alias: ["8b", "ball"],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        if (args.length >= 2) {
            // Define the answers arr
            const arr = ["Don’t count on it.",
                "My reply is no.",
                "My sources say no.",
                "Outlook not so good.",
                "Very doubtful.",
                "Concentrate and ask again.",
                "Cannot predict now.",
                "Better not tell you now.",
                "Ask again later.",
                "Reply hazy, try again.",
                "As I see it, yes.", "Most likely.",
                "Outlook good.",
                "Yes.",
                "bro how could that ever be a yes?",
                "Signs point to no you dumbass how could you oversee that????",
                "yes chief",
                "thanos snapped my mind... Wait whaat weher w- we... tallking aboutt---",
                "computer said no",
                "gay question try again later",
                "the bot is offline but imma say that is a yes",
                "yep",
                "half of these answers are from wikipedia so im going to assume that this will be a yes",
                "yesnt",
                "nosn't",
                "dont count on it.",
                "that question is **cringe**",
                "All signs point to idk.",
                "JCIgaming approved that this answer is a no"
            ]
            // Get a random answer
            const randomNumber = Math.floor(Math.random() * arr.length)
            // Send the answer
            functions.embed(message.channel, ":8ball: says:", colourInfo, arr[randomNumber])
        } else {
            message.channel.send("bro you are 100% cringe... What do you even want to be answered???")
        }
    }
}