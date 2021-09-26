const f = require('../functions.js');

module.exports = {
    name: '8ball',
    description: f.localization("commands","8ball","exports").description,
    category: 'fun',
    modcommand: false,
    usage: f.localization("commands","8ball","exports").usage,
    perms: '',
    alias: ["8b", "ball"],
    cooldown: 2,
    run: function (message, prefix, args, client) {
        // Get the colour info
        const colourInfo = f.config().messageColours.info;
        f.log(`Got info colour, ${colourInfo}`)

        if (args.length >= 2) {
            // Define the answers arr
            const arr = f.localization("commands","8ball","arr")
            // Get a random answer
            const randomNumber = Math.floor(Math.random() * arr.length)
            f.log(`Random number generated, ${randomNumber}`)
            // Send the answer
            f.embed(message, f.localization("commands","8ball","8bsays"), colourInfo, arr[randomNumber])
        } else {
            f.log(`User didn't specify a another user.`)
            message.channel.send(f.localization("commands","8ball","deny"))
        }
    }
}