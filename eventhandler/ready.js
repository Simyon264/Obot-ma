const discord = require('discord.js');
module.exports = {
    run: function(client) {
        client.once('ready', () => {
            console.log('Started!');
        });
    }
}

