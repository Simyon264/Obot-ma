const fs = require("fs");
const functions = require("../functions.js")

module.exports = {
    run: function(client) {
        client.on('message', (message) => {
            var colourInfo = functions.config().messageColours.info;
            var colourWarn = functions.config().messageColours.warn;
            var prefix = functions.config().bot.generalPrefix;

            if (!message.guild) return;
            var content = message.content;
            if (content.substring(0, prefix.length).toLowerCase() == prefix.toLowerCase()) {
                var args = content.substring(prefix.length).split(" ");
                fs.stat(`./commands/${args[0]}.js`, function(err, stat) {
                    if (err == null) {
                        try {                                
                            var commandFile = require(`../commands/${args[0]}`);
                            commandFile['run'](message, prefix, args, client);
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