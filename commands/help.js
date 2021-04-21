const discord = require("discord.js")

module.exports = {
    aliases: ['h'],
    bypass_block: false,
    name: 'help',
    about: "Recieve a list of commands, or read documentation about a specific command.",
    usage: "help [command]",
    category: "General",
    run: (client, message, args) => {
        message.channel.send("Soon:tm:")
    }
}