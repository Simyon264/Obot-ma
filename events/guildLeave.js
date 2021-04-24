module.exports = {
    run: (client) => {
        client.on('guildDelete', async (guild) => {
            try {
                await db.query("DELETE FROM guilds WHERE guild_id=$1", [guild.id])
            } catch (err) {
                throw err; // Logging can be done here
            }
        })
    }
}