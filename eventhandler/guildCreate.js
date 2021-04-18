const fs = require("fs");
const f = require("../functions.js")

module.exports = {
    run: function (client) {
        client.on('guildCreate', (guild) => {
            try {
                f.log('The bot joined a new guild!')
                if (!guild.available) return f.log('Guild is not available, returning.');
                fs.writeFileSync(`../files/serverConfigs/${guild.id}.json`, JSON.stringify(fs.readFileSync("../files/serverConfigs/template.json")))
            } catch (error) {
                f.error(error, "guildcreate.js", true)
            }
        });
    }
}