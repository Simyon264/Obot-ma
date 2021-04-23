const discord = require("discord.js")
const db = require("../db");

module.exports = {
    aliases: ['slc', 'setlog', 'log'],
    bypass_block: false,
    name: 'setlogchannel',
    about: "Set the channel where the bot will log members joining/leaving, messages deleted/edited and memebers changing nicknames. Note: the channel argument must be a Discord channel e.g. #logs",
    usage: "setlogchannel <channel>",
    category: "Server",
    perms: 'ADMINISTRATOR',
    cooldown: 1000, // Milliseconds
    run: async (client, message, args) => {
        // Check if the channel was given
        if (!args) {
            message.channel.send("Missing argument: **channel**")
            return;
        }

        // Check if the args passed was a channel
        let channel = message.mentions.channels.first().id
        if (!channel) {
            message.channel.send(`Invalid argument: **${args}**. Please enter a valid Discord channel.`)
            return;
        }

        await db.query("UPDATE guilds SET log_channel=$1 WHERE guild_id=$2", [channel, message.guild.id])
        message.channel.send(`The logging channel is now set to **${message.mentions.channels.first().name}**`)
    }
}