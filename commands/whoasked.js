const functions = require('../functions.js');
const colourInfo = functions.config().messageColours.info;

module.exports = {
    name: 'whoasked',
    description: 'Checks who tf asked',
    category: 'fun',
    modcommand: false,
    usage: 'whoasked',
    perms: '',
    alias: [],
    cooldown: 4,
    run: function (message, prefix, args, client) {
        let messages = []
        let randomMessage = 1
        let randomNumber = functions.randomInt(1, 150)
        if (randomNumber >= 0 && randomNumber <= 20) {
            messages = message.guild.members.cache.array()
            randomMessage = functions.randomInt(0, messages.length)
            functions.embed(message.channel, "", colourInfo, `${messages[randomMessage]} asked, allow it ig.`)
        } else if (randomNumber >= 21 && randomNumber <= 130) {
            messages = ["this mf dumbass Mr.Pluff asked bruh.", "Spongebob asked. Not really proving anything but he asked.", "Joe asked. Who is joe? Well its JOE MAMA HAHA GOTEM","ur mom asked", "sorry simyon pushed the answer into lava but ig you asked",`i asked`,"what?","ur dad ask- oh right your dad has gone away for milk"]
            randomMessage = functions.randomInt(0, messages.length)
            message.channel.send(messages[randomMessage])
        } else {
            messages = ["I've contacted the NSA, they're looking for who tf asked.", "nobody asked.", "Your ask will be delivered in 5-7 days", "God couldn't even find out who tf asked.", "There are like 8 billion poeple on earth and im still looking for someone who asked."]
            randomMessage = functions.randomInt(0, messages.length)
            message.channel.send(messages[randomMessage])
        }
    }
}