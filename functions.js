const fs = require('fs')
const discord = require('discord.js')
const f = require('./functions.js')
const colors = require('colours')
const path = require("path");

exports.config = function (config) {
    try {
        return (JSON.parse(fs.readFileSync("./files/important files/config.json")))
    } catch {
        f.log("Error: Config file missing or damaged, using hardcoded config.", 3)
        const config = {
            "bot": {
                "version": "2.4.6",
                "Authors": "Simyon#6969, JoshuaZacek#4354",
                "generalPrefix": "!",
                "description": "The bot for the discord of JCIgaming",
            },
            "special": {
                "owner": "327840918482714626"
            },
            "messageColours": {
                "info": "0x0099ff",
                "warn": "0xf54242",
                "done": "0x00ff95",
                "mod": "0xeb9b34",
                "member": "0x923afc"
            },
            "commands": {
                "categories": [
                    "general",
                    "moderation",
                    "fun",
                    "server"
                ]
            }
        }
        return config;
    }
}

exports.execute = function (command, message, client, prefix, args) {
    try {
        const commandFile = require(`./commands/${command}.js`) // Get the command file
        f.log(`Command execution reqeusted. Command: ${commandFile['name']}`)
        commandFile['run'](message, prefix, args, client) // Run the command
        f.log(`Command executed: ${commandFile['name']}`)
        return {
            code: 0
        };
    } catch (error) {
        f.log('Command execution failed.')
        if (error.code == 'MODULE_NOT_FOUND') return {
            code: 1,
            error: error
        };
        return {
            code: 2,
            error: error
        };
    }
}

exports.embed = function (channel, title, colour, message, returnEmbedOnly) {
    if (!returnEmbedOnly) {
        var embed = new discord.MessageEmbed()
            .setTitle(title)
            .setColor(colour)
            .setDescription(message);

        channel.send(embed);
    } else {
        var embed = new discord.MessageEmbed()
            .setTitle(title)
            .setColor(colour)
            .setDescription(message);
        return embed;
    }
}

exports.error = function (err, customFileName, sendConsoleLog) {
    try {
        let error = `\n${err.code}\n\n${err.stack}` // Get the error and the error stacktrace
        let date = new Date() // The date when the error occured
        let iso_date = date.toISOString() // Gets the iso date
        let log_filename = `error_${iso_date}` // Generate the file name
        if (typeof customFileName == 'string') log_filename = `error_${iso_date}_${customFileName}`;
        log_filename = log_filename.replace(/\:/g, '.') // Replaces : with . so its a valid format

        fs.writeFileSync(`./files/log/${log_filename}.txt`, error) // Write the file
        if (sendConsoleLog) console.log(colors.red(`An error occured! The error can be found in ./files/log/${log_filename}.txt`)) // Console log that a error occured
        f.log(err, 3)
    } catch (error) {
        console.log('The error handler had a error.\n\n', error)
    }
}

exports.log = function (log, customStackNum, override, msgOverride) {
    let stackNum = 2
    if (customStackNum) stackNum = customStackNum;
    let lineNumber = new Error().stack.split("at ")[stackNum].trim()
    lineNumber = path.basename(lineNumber)
    lineNumber = lineNumber.replace(')', '')
    lineNumber = lineNumber.replace('(', '')
    const d = new Date()
    lineNumber = `[${d.getHours()}:${d.getMinutes()}.${d.getMilliseconds()}] - ${lineNumber}`

    if (typeof msgOverride != 'string') msgOverride = ">"
    if (logconsole == false) {
        if (devMode || override.devMode) console.log(`${lineNumber} ${msgOverride} ${log}`)
    }

    if (writeLog || override.writeLog) {
        file = fs.readFileSync('./files/log/latest.log', 'utf-8')

        file = file + `\n${lineNumber} ${msgOverride} ${log}`
        fs.writeFileSync('./files/log/latest.log', file)
    }
}

exports.getServerConfig = function (guildID) {
    try {
        let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${guildID}.json`))
        return file;
    } catch (error) {
        return JSON.parse(fs.readFileSync("./files/serverConfigs/template.json"))
    }
}

exports.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}