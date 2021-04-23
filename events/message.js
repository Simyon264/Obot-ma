const config = require("../config.json")
const db = require("../db")
const fs = require("fs")
const cooldowns = new Map()

const infoColor = config.messageColors.info
const warnColor = config.messageColors.warn

// Search for aliases
function aliasSearch(alias) {
    let commandsDir = fs.readdirSync("./commands/")

    for (let i = 0; i < commandsDir.length; i++) {
        let commandFile = require(`../commands/${commandsDir[i]}`)
        if (commandFile.aliases.includes(alias.toLowerCase())) {
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
function runCommand(command, commandArgs, message, client) {
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
    let cooldownTimeRemaining = cooldown(command, message, commandFile.cooldown)
    if (!cooldownTimeRemaining) {
        commandFile.run(client, message, commandArgs)
    } else {
        message.channel.send(`Your sending messages too fast! Please wait **${cooldownTimeRemaining}** seconds`)
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

            // Check if user is blocked. If they are, do nothing
            let res = await db.query("SELECT * FROM blocks WHERE user_id=$1 AND guild_id=$2", [message.author.id, message.guild.id])
            if (res.rowCount != 0) {
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
        })
    }
}