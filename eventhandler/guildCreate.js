const fs = require("fs");
const functions = require("../functions.js")

module.exports = {
    run: function(client) {
        client.on('guildCreate', (guild) => {
            if (!guild.available) return;
            fs.writeFileSync(`../files/serverConfigs/${guild.id}.json`, JSON.stringify(fs.readFileSync("../files/serverConfigs/template.json")))
        });
    }
}