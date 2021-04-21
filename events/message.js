const config = require("../config.json")
const db = require("../db")
const fs = require("fs")

function aliasSearch(alias) {
    let commandsDir = fs.readdirSync("./commands/")

    for (let i = 0; i < commandsDir.length; i++) {
        let commandFile = require(`../commands/${commandsDir[i]}`)
        if (commandFile.aliases.includes(alias.toLowerCase())) {
            return commandsDir[i]
        }
    }
}

module.exports = {
    run: (client) => {
        client.on("message", async (message) => {
            let infoColor = config.messageColors.info
            let warnColor = config.messageColors.warn
            // Query the database for the guild config
            let guild;
            try {
                // Look for guild in the db by it's id
                let res = await db.query("SELECT * FROM guilds WHERE guild_id=$1", [message.guild.id])
                // If it exists in the db
                if (res.rowCount) {
                    guild = res.rows[0]
                } else {
                    // Create the guild in the db
                    let res = await db.query("INSERT INTO guilds(guild_id) VALUES ($1) RETURNING *", [message.guild.id])
                    guild = res
                }
            } catch (err) {
                throw err; //Logging can be done here
            }

            // Filter out DMs and own messages
            if (!message.guild || message.author.bot) {
                return;
            }

            let content = message.content

            // Respond to messages containing the word rigged
            if (content.includes("rigged")) {
                let random_number = Math.floor((Math.random() * 100))
                if (random_number == 69) {
                    message.channel.send("It's rigged")
                } else {
                    message.channel.send("It's not rigged")
                }
            }

            // Get guild prefix. If none exists, then use the default prefix
            let prefix = guild.prefix ? guild.prefix : "!"

            // Reply when the bot is pinged
            if (client.user == message.mentions.users.first()) {
                message.channel.send(`My prefix here is: ${prefix}`)
            }

            // If the first few characters in a messages are equal to the guild prefix
            if (content.slice(0, prefix.length).toLowerCase() == prefix) {
                let splitMessage = content.split(' ') // Split the message using spaces
                let command = splitMessage[0].slice(prefix.length) // Get the first element in the slipt message (the command), and remove the prefix
                let commandArgs = splitMessage.slice(1).join(' ') // Get the split message, remove the first element (command), and join the split message with spaces
                
                try {
                    // Run the command
                    let commandFile = require(`../commands/${command}`)
                    commandFile.run(client, message, commandArgs)
                } catch (err) {
                    if (err.code == "MODULE_NOT_FOUND") {
                        // Search for command aliases
                        let commandName = aliasSearch(command)
                        if (commandName) {
                            let commandFile = require(`../commands/${commandName}`)
                            commandFile.run(client, message, commandArgs)
                        } else {
                            message.channel.send("Command not found")
                        }
                    } else {
                        throw err;
                    }
                }
            }
        })
    }
}