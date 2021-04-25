const discord = require("discord.js")
const config = require("../config.json")
const fs = require("fs")

// Auto set color if config is missing
const infoColor = config.messageColors?.info || "0x0099ff"

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

module.exports = {
    aliases: ['h'],
    name: 'help',
    about: "Recieve a list of commands, or read documentation about a specific command.",
    usage: "help [command]",
    category: "General",
    cooldown: 500, // Milliseconds
    run: (client, message, args) => {
        // Look to see if there are any arguments passed
        if (args) {
            let commandFile;

            // See if the argument provided is a command
            try {
                commandFile = require(`../commands/${args}`)
            } catch (err) {
                if (err.code == "MODULE_NOT_FOUND") {
                    let commandName = aliasSearch(args)
                    if (commandName) {
                        commandFile = require(`../commands/${commandName}`)
                    } else {
                        message.channel.send(`Error: Command **${args}** doesn't exist`)
                        return;
                    }
                } else {
                    message.channel.send("What the... something went wrong")
                }
            }

            // Format aliases
            let aliases;
            if (commandFile.aliases) {
                for (i in commandFile.aliases) {
                    commandFile.aliases[i] = `\`${commandFile.aliases[i]}\``
                }
                aliases = commandFile.aliases.join(' ')
            } else {
                aliases = "*none*"
            }

            // Format cooldown
            let cooldown;
            if (commandFile.cooldown) {
                cooldown = `${commandFile.cooldown / 1000} second(s)`
            } else {
                cooldown = '*none*'
            }

            // Command info
            let commandName = capitaliseFirstLetter(commandFile.name || "?")
            let about = commandFile.about || "?"
            let category = commandFile.category || "Uncategorised"
            let usage = commandFile.usage || "?"
            let perms = commandFile.perms || "*none*"

            // The help message for the command
            let helpEmbed = new discord.MessageEmbed()
                .setTitle(commandName)
                .setColor(infoColor)
                .setDescription("Paramaters wrapped with `[]` are optional, and paramaters wrapped with `<>` are required.")
                .addField("About", about)
                .addField("Category", category)
                .addField("Usage", usage)
                .addField("Permsissons", perms)
                .addField("Cooldown", cooldown)
                .addField("Aliases", aliases)
            
            message.channel.send(helpEmbed)
        } else {
            //Create help embed
            let helpEmbed = new discord.MessageEmbed()
                .setTitle("Commands")
                .setColor(infoColor)

            let commands = fs.readdirSync("./commands")
            let categories = {}

            // Look for every category, create categories, and put commands in categories
            for (i in commands) {
                let commandFile = require(`../commands/${commands[i]}`)

                let category = (commandFile.category || "uncategorised").toLowerCase()
                if (!categories[category]) {
                    let command = `\`${commands[i].slice(0, -3)}\``
                    categories[category] = []
                    categories[category].push(command)
                } else {
                    let command = `\`${commands[i].slice(0, -3)}\``
                    categories[category].push(command)
                }
            }

            // Add category fields
            for (i in categories) {
                helpEmbed.addField(capitaliseFirstLetter(i), categories[i].join(' '))
            }

            // Send message
            helpEmbed.addField("For more detail on specific commands...", "`help [command]`")
            message.channel.send(helpEmbed)
        }
    }
}