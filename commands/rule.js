const f = require('../functions.js');
const fs = require('fs')

const colourInfo = f.config().messageColours.info;
const colourWarn = f.config().messageColours.warn;
const colourDone = f.config().messageColours.done;

module.exports = {
    name: 'rule',
    description: f.localization("commands","rule","exports").description,
    category: 'server',
    modcommand: true,
    usage: f.localization("commands","rule","exports").usage,
    perms: 'MANAGE_GUILD',
    alias: ["rules"],
    cooldown: 5,
    run: function (message, prefix, args, client) {
        let file = fs.readFileSync(`./files/important files/rules.txt`, 'utf-8') // Get the rules
        let lines = file.split("\n"); // Put every line into a array
        let config = f.getServerConfig(message.guild.id) // Get the server config
        try {
            config.ruleMessages.forEach(element => {
                client.channels.cache.get(f.getServerConfig(message.guild.id).rules).messages.fetch(element).then(message => message.delete())
            });
        } catch (error) {
            //console.log(error)   
        }
        config.ruleMessages = [] // Reset the rule message array
        let cache = ""
        let nochannel = false
        /*/
        | This loops through the entire rule array and puts every line into a cache. Once it reaches a ^ char it sends an
        | Embed with the cache and clears it. If the cahnnel is not definded it sends nothing.
        | gay
        /*/
        for (i in lines) {
            if (lines[i].includes('^')) {
                const query = client.channels.cache.find(channel => channel.id === f.getServerConfig(message.guild.id).rules)
                if (typeof query !== 'undefined' && query) {
                    let embed = f.embed('', '', colourInfo, cache, true)
                    cache = ""
                    query.send(embed).then((sentMessage) => {
                        config.ruleMessages.push(`${sentMessage.id}`)
                        fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(config))
                    });
                } else {
                    nochannel = true
                }
            } else {
                cache = cache + `${lines[i]}\n`
            }
        }
        fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(config)) // Write the file
        if (nochannel) f.embed(message.channel, "Error", colourWarn, "The rule channel is not defined.")
        if (!nochannel) f.embed(message.channel, "Done :clap:", colourDone, "I send the messages you wanted me to send!")
    }
}