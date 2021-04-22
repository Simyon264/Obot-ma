module.exports = {
    run: (client) => {
        client.on('guildCreate', async (guild) => {
            try {
                await db.query("INSERT INTO guilds(guild_id) VALUES ($1) RETURNING *", [guild.id])
            } catch (err) {
                throw err; // Logging can be done here
            }
            // Maybe in the future the bot could send a welcome message
        })
    }
}