const config = require("../config.json")
const db = require("../db")
const fs = require("fs")
const cooldowns = new Map()

// Auto set color if config is missing
const infoColor = config.messageColors?.info || "0x0099ff"
const warnColor = config.messageColors?.warn || "0xf54242"

// Search for aliases
function aliasSearch(alias) {
    let commandsDir = fs.readdirSync("./commands/")

    for (let i = 0; i < commandsDir.length; i++) {
        let commandFile = require(`../commands/${commandsDir[i]}`)
        if (commandFile.aliases && commandFile.aliases.includes(alias.toLowerCase())) {
            return commandsDir[i].slice(0, -3)
        }
    }
}

// Check if user is in the cooldown map for a specific command, if they are tell them to wait, if they aren't, add them and delete them after a certain amount of time
function cooldown(command, message, time) {
    let commandCooldown = cooldowns.get(command)
    let cooldownTimestamp = commandCooldown.get(message.author.id)
    let now = new Date()
    
    if (!cooldownTimestamp) {
        commandCooldown.set(message.author.id, now)

        setTimeout(() => commandCooldown.delete(message.author.id), time)

        return;
    } else {
        // Calculate the time remaining until they can run this command again, and then round it to 1 d.p.
        let timeRemaining = ((cooldownTimestamp - now) + time) / 1000
        return timeRemaining.toFixed(1);
    }
}

// Run a command
async function runCommand(command, commandArgs, message, client) {
    let commandFile = require(`../commands/${command}`)

    // Perms check
    let commandPerms = commandFile.perms
    if (commandPerms) {
        if (!message.member.permissions.has(commandPerms)) {
            message.channel.send("You don't have permission to run this command.")
            return;
        }
    }

    // Cooldown
    let cooldownTimeRemaining = cooldown(command, message, commandFile.cooldown || 0)
    if (!cooldownTimeRemaining) {
        commandFile.run(client, message, commandArgs)
    } else {
        message.channel.send(`You're sending messages too fast! Please wait **${cooldownTimeRemaining}** seconds`)
    }
}

module.exports = {
    run: (client) => {
        // Put all commands in the cooldowns. 
        let commands = fs.readdirSync("./commands/")
        for (i in commands) {
            let commandName = commands[i].slice(0, -3)
            cooldowns.set(commandName, new Map())
        }

        client.on("message", async (message) => {
            try {
                // Filter out DMs and own messages
                if (!message.guild || message.author.bot) {
                    return;
                }

                // Query the database for the guild config
                let guild;
                // Look for guild in the db by it's id
                let guildDatabase = await db.query("SELECT * FROM guilds WHERE guild_id=$1", [message.guild.id])
                // If it exists in the db
                if (guildDatabase.rowCount) {
                    guild = guildDatabase.rows[0]
                } else {
                    // Create the guild in the db
                    let guildDatabase = await db.query("INSERT INTO guilds(guild_id) VALUES ($1) RETURNING *", [message.guild.id])
                    guild = guildDatabase
                }

                let content = message.content

                // Get guild prefix. If none exists, then use the default prefix
                let prefix = guild.prefix ? guild.prefix : "!"

                let splitMessage = content.split(' ') // Split the message using spaces
                let command = splitMessage[0].slice(prefix.length) // Get the first element in the slipt message (the command), and remove the prefix
                let commandArgs = splitMessage.slice(1).join(' ') // Get the split message, remove the first element (command), and join the split message with spaces 

                // Check if user is blocked and if the command allows blocked users to run it. If they are, do nothing
                let blockDatabase = await db.query("SELECT * FROM blocks WHERE user_id=$1 AND guild_id=$2", [message.author.id, message.guild.id])
                if (blockDatabase.rowCount != 0) {
                    if (command != "unblock") return;
                }

                // Respond to messages containing the word rigged
                if (content.includes("rigged")) {
                    let random_number = Math.floor((Math.random() * 100))
                    if (random_number == 69) {
                        message.channel.send("It's rigged")
                    } else {
                        message.channel.send("It's not rigged")
                    }
                }

                // Reply when the bot is pinged
                if (client.user == message.mentions.users.first()) {
                    message.channel.send(`My prefix here is: ${prefix}`)
                }

                // If the first few characters in a messages are equal to the guild prefix
                if (content.slice(0, prefix.length).toLowerCase() == prefix) {
                    try {
                        // Run the command
                        let commandFile = require(`../commands/${command}`) // Check if the command file exists in the commands directory

                        runCommand(command, commandArgs, message, client)
                    } catch (err) {
                        if (err.code == "MODULE_NOT_FOUND") {
                            // Search for command aliases
                            let commandName = aliasSearch(command)
                            if (commandName) {
                                runCommand(commandName, commandArgs, message, client)
                            } else {
                                message.channel.send("Command not found")
                            }
                        } else {
                            throw err;
                        }
                    }
                }
            } catch (err) {
                message.channel.send(`Error: ${err.message}`)
                console.log(err)
            }
        })
    }
}