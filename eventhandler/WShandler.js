const discord = require('discord.js');
const f = require('../functions.js')

module.exports = {
    run: function (client) {
        try {
            client.on('ready', () => {
                client.user.setPresence({
                        activity: {
                            name: 'Obama simulator 2021',
                            type: 'PLAYING'
                        },
                        status: 'dnd'
                    })
                    .then(() => {
                        console.log('Client connected!')
                        console.log('Authed for user', client.user.username);
                        f.log('Client connected.')
                        f.log(`Authed for user ${client.user.username}`)
                    });
            });
            client.on('shardDisconnect', () => {
                f.log('Client disconnected.')
            });
            client.on('shardReconnecting', () => {
                f.log('Client reconnecting...')
            })
        } catch (error) {
            f.error(error, 'WShandler.js', true)
        }

    }
}