const functions = require('../functions.js');
const discord = require('discord.js');

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;

module.exports = {
    name: 'whoasked',
    description: 'Checks who tf asked',
    category: 'fun',
    modcommand: false,
    usage: 'whoasked',
    perms: '',
    alias: [],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        let messages = []
        let randomMessage = 1
        let randomNumber = functions.randomInt(1, 3)
        //1-Failed 2-Random Person asked 3-Someone asked
        switch (randomNumber) {
            case 1:
                messages = ["I've contacted the NSA, they're looking for who tf asked.", "nobody asked.", "Your ask will be delivered in 5-7 days", "God couldn't even find out who tf asked.", "There are like 8 billion poeple on earth and im still looking for someone who asked."]
                randomMessage = functions.randomInt(0, messages.length)
                message.channel.send(messages[randomMessage])
                break;
            case 2:
                messages = ["this mf dumbass Mr.Pluff asked bruh.", "Spongebob asked. Not really proving anything but he asked.", "Joe asked. Who is joe? Well its JOE MAMA HAHA GOTEM"]
                randomMessage = functions.randomInt(0, messages.length)
                message.channel.send(messages[randomMessage])
                break;
            case 3:
                messages = message.guild.members.cache.array()
                randomMessage = functions.randomInt(0, messages.length)
                functions.embed(message.channel, "", colourInfo, `${messages[randomMessage]} asked, allow it ig.`)
                break;
            default:
                console.log(randomNumber)
                break;
        }
    }
}