const f = require('../functions.js');

module.exports = {
    name: 'dice',
    description: 'Roll the dice.',
    category: 'fun',
    modcommand: false,
    usage: 'dice [min],[max]',
    perms: '',
    alias: ["randomnumber", "rn"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        if (args.length == 2) { // Check if a custom number was mentioned
            let arg = args // Copy args
            arg.splice(0, 1); // Remove first args
            const argsJoined = arg.join(' '); // Join it again
            arg = argsJoined.split(','); // Split it based on ,
            args = arg // Set args to arg
            if (typeof args[1] !== 'undefined') {
                const randomNumber = f.randomInt(args[0], args[1])
                message.channel.send(`:game_die: ${randomNumber}`)
            } else {
                const randomNumber = Math.floor(Math.random() * 6)
                message.channel.send(`:game_die: ${randomNumber}`)
            }
        } else {
            const randomNumber = Math.floor(Math.random() * 6)
            message.channel.send(`:game_die: ${randomNumber}`)
        }
    }
}