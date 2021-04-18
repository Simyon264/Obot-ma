module.exports = {
    name: 'say',
    description: 'Make the bot say something',
    category: 'general',
    modcommand: false,
    usage: 'say <what you want the bot to say>',
    perms: '',
    alias: [],
    cooldown: 3,
    run: function (message, prefix, args, client) {
        let messageToSay = args;
        messageToSay.splice(0, 1); // Remove command from message

        // Join the array into a string
        messageToSay = messageToSay.join(" ");
        if (messageToSay.length <= 1000) {
            if (messageToSay.includes("@")) {
                message.channel.send("UwU you are my favorite owner and i would do anything for you but my creator forbid me from inlcuding @ in my messages!!! :( btw could you please punch me harder oh daddy pls");
            } else {
                message.channel.send(messageToSay)
            }
        } else {
            message.channel.send("UwU daddy i wanted to say that but its too long just like your-")
        }

    }
}