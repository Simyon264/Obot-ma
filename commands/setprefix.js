const discord = require("discord.js");
const db = require("../db");

module.exports = {
    aliases: ['prefix'],
    name: 'setprefix',
    about: "Set the bot's prefix for the current server. Prefixes must not contain spaces or be larger than 100 characters.",
    usage: "setprefix <prefix>",
    category: "Server",
    perms: 'ADMINISTRATOR',
    cooldown: 2000, // Milliseconds
    run: async (client, message, args) => {
        // Check if the prefix was given
        if (!args) {
            message.channel.send("Missing argument: **prefix**")
            return;
        }

        // Check if the prefix contains any spaces
        if (/\s/.test(args)) {
            message.channel.send("Error: Prefixes cannot contain spaces")
            return;
        }

        // Check if the prefix is under 100 characters
        if (args.length <= 100) {
            await db.query("UPDATE guilds SET prefix=$1 WHERE guild_id=$2", [args, message.guild.id])
            message.channel.send(`The prefix is now set to **${args}**`)
        } else {
            message.channel.send("Error: Prefixes cannot be over 100 characters.")
        }
    }
}   