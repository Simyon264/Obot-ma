const functions = require('../functions.js');
const discord = require('discord.js');
const fs = require('fs')

var colourInfo = functions.config().messageColours.info;
var colourWarn = functions.config().messageColours.warn;
let colourDone = functions.config().messageColours.done;

module.exports = {
    name: 'rule',
    description: 'Resends the rules.',
    category: 'server',
    modcommand: true,
    usage: 'rule',
    perms: 'MANAGE_GUILD',
    alias: ["rules"],
    cooldown: 5,
    run: function (message, prefix, args, client) {
        let file = fs.readFileSync(`./files/important files/rules.txt`,'utf-8')
        let lines = file.split("\n");
        let config = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`))
        try {      
            config.ruleMessages.forEach(element => {    
                client.channels.cache.get(functions.getServerConfig(message.guild.id).rules).messages.fetch(element).then(message => message.delete())
            });
        } catch (error) {
            //console.log(error)   
        }
        config.ruleMessages = []
        let cache = ""
        for (i in lines) {
            if (lines[i].includes('^')) {
                const query = client.channels.cache.find(channel => channel.id === functions.getServerConfig(message.guild.id).rules)
                if (typeof query !== 'undefined' && query) {
                    let embed = functions.embed('', '', colourInfo, cache, true)
                    cache = ""
                    query.send(embed).then((sentMessage) => {
                        config.ruleMessages.push(`${sentMessage.id}`)
                        fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(config)) 
                    });
                } else {
                    functions.embed(message.channel, "Error", colourWarn, "The rule channel is not defined.")   
                }
            } else {
                cache = cache + `${lines[i]}\n`  
            }   
        }
        fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(config))
        functions.embed(message.channel, "Done :clap:", colourDone, "I send the messages you wanted me to send!")
    }
}