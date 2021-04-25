const discord = require("discord.js")
const config = require("../config.json")
const fs = require("fs")

const infoColor = config.messageColors.info

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
    bypass_block: false,
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

            // Make aliaes look nice in Discord
            let aliases = commandFile.aliases
            for (i in aliases) {
                aliases[i] = `\`${aliases[i]}\``
            }
            let aliasesString = aliases.join(' ')

            // The help message for the command
            let helpEmbed = new discord.MessageEmbed()
                .setTitle(capitaliseFirstLetter(commandFile.name))
                .setColor(infoColor)
                .setDescription("Paramaters wrapped with `[]` are optional, and paramaters wrapped with `<>` are required.")
                .addField("About", commandFile.about || "*missing info*")
                .addField("Category", commandFile.category || "none")
                .addField("Example", commandFile.usage || "*missing info*")
                .addField("Permsissons", commandFile.perms || "none")
                .addField("Cooldown", `${commandFile.cooldown / 1000} second(s)` || "none")
                .addField("Aliases", aliasesString || "none")
            
            message.channel.send(helpEmbed)
        } else {
            
            let helpEmbed = new discord.MessageEmbed()
                .setTitle("Commands")
                .setColor(infoColor)

            let commands = fs.readdirSync("./commands")
            // Sort commands into categories that are in the config file, or put them into the other category
            let uncategorisedCommands = []
            for (i in config.categories) {
                let commandsArray = []

                for (j in commands) {
                    let commandFile = require(`../commands/${commands[j]}`)

                    if (commandFile.category) {
                        if (commandFile.category.toLowerCase() == config.categories[i].toLowerCase()) {
                            commandsArray.push(`\`${commandFile.name}\``)
                        }
                    } else if (!uncategorisedCommands.includes(`\`${commandFile.name}\``)) {
                        uncategorisedCommands.push(`\`${commandFile.name}\``)
                    }
                }

                let categoryName = capitaliseFirstLetter(config.categories[i])
                helpEmbed.addField(categoryName, commandsArray.join(' '))
            }

            // Put commands with no category in an other category
            if (uncategorisedCommands.length) {
                helpEmbed.addField("Uncategorised", uncategorisedCommands.join(' '))
            }

            helpEmbed.addField("For more detail on specific commands...", "`help [command]`")
            message.channel.send(helpEmbed)
        }
    }
}