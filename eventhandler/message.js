const fs = require("fs");
const colors = require("colours")
const functions = require("../functions.js")

module.exports = {
    run: function(client) {
        client.on('message', (message) => {
            var colourInfo = functions.config().messageColours.info;
            var colourWarn = functions.config().messageColours.warn;
            
            //If the guild config file is there
            try {
                fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`)
            } catch (error) {
                console.log(colors.red(`Error: Guild config file for ` + colors.yellow(`${message.guild.name}`) + colors.red(` is missing, creating file...`)))
                fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(JSON.parse(fs.readFileSync("./files/serverConfigs/template.json"))))
                console.log(colors.green(`Success: Guild config file for ${colors.yellow(`${message.guild.name}`)}` + colors.green(` was written!`)))
            }
            //defining the prefix after config check so i dont try to get something from a file that may not even be there
            var prefix = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`)).prefix;

            if (!message.guild) return;
            var content = message.content;
            if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
                var args = content.substring(prefix.length).split(" ");
                fs.stat(`./commands/${args[0]}.js`, function(err, stat) {
                    if (err == null) {
                        try {
                            var commandFile = require(`../commands/${args[0]}`);
                            //perms check so you dont have to do it in the file lmao
                            var cmdRoles = commandFile['perms'];
                            if (message.member.permissions.has(cmdRoles)) {
                                commandFile['run'](message, prefix, args, client);
                            } else {
                                functions.embed(message.channel,"Error",colourWarn,"You are missing the permission: `" + cmdRoles + "`!")
                            }
                        } catch (err) {
                            console.log(`${message.content}`);
                            console.log(err);

                            functions.embed(message.channel, "", colourWarn, "An error occured!");   
                        }
                    } else if (err.code === 'ENOENT') {
                        functions.embed(message.channel, "", colourWarn, "Command does not exist");
                    } else {
                        console.log(err);
                        functions.embed(message.channel, "", colourWarn, "An unexpected error has occured. Please contact the bot owner");   
                    }
                });
            }
        });
    }
}