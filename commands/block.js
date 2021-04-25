const discord = require("discord.js")
const db = require("../db");

module.exports = {
    aliases: [],
    name: 'block',
    about: "Prevents a user from using any commands only on this server. Note: The user argument must be a Discord mention e.g. @Joshua_",
    usage: "block <user>",
    category: "Moderation",
    perms: 'ADMINISTRATOR',
    cooldown: 1000, // Milliseconds
    run: async (client, message, args) => {
        // Check if the a user was given
        if (!args) {
            message.channel.send("Missing argument: **user**")
            return;
        }

        // Check if the args passed was a Discord mention
        let user = message.mentions.users.first()
        if (!user) {
            message.channel.send(`Invalid argument: **${args}**. Please enter a valid Discord mention.`)
            return;
        }

        // Check if user is already blocked
        let res = await db.query("SELECT * FROM blocks WHERE user_id=$1 AND guild_id=$2", [user.id, message.guild.id])
        if (res.rowCount != 0) {
            message.channel.send(`${user} is already blocked.`)
            return;
        }

        // Block user
        await db.query("INSERT INTO blocks VALUES ($1, $2)", [user.id, message.guild.id])
        message.channel.send(`${user} is now blocked!`)
    }
}