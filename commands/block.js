const f = require('../functions.js');
const fs = require('fs')

module.exports = {
    name: 'block',
    description: 'Block someone from using a command.',
    category: 'moderation',
    modcommand: true,
    usage: 'block <user> <admin block(true,false)>',
    perms: 'MANAGE_GUILD',
    alias: [],
    cooldown: 10,
    run: function (message, prefix, args, client) {
        f.log('Looking if user could be pinged')
        if (args.length >= 2) { // If a user could have been pinged
            f.log('User could be pinged.')
            let admin = false // Set admin block to false
            if (args.length == 3) { // If admin block was specifed
                f.log('Admin block detected.')
                if (message.author.id == f.config().special.owner) { // Perms check for owner
                    if (args[2] == "true") { // If it was true, set admin block to true
                        admin = true
                        f.log('Admin block is now true')
                    }
                } else return message.channel.send("awww you silly goose!!!! only my owner is able to admin block someone!!!!") // If perms check fails
            }

            let user = message.mentions.users.first(); // Get user object from ping
            if (user) { // If a user was pinged
                f.log('A user was pinged.')
                user = message.mentions.users.first().id
                let file = JSON.parse(fs.readFileSync(`./files/serverConfigs/${message.guild.id}.json`))
                if (typeof file.blockedUsers !== 'undefined') { // Check if database has the blocked users array
                    let found = false // Set found to false for later use
                    /*/
                    This for loop, loops through the entire blocked users array.
                    If it finds the id of the user in the array, it sets found to true.
                    /*/
                    for (let index = 0; index < file.blockedUsers.length; index++) {
                        if (file.blockedUsers[index].id == user) {
                            found = true
                        }
                    }
                    // If the user is in the database already, do nothing
                    if (found) return message.channel.send("uwu i already found this user in my database along with ur long-")
                    // Push the new user into the arr
                    file.blockedUsers.push({
                        id: `${user}`,
                        adminBlock: admin
                    })
                    // Write the new guild config and send the confirm message
                    fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                    message.channel.send(`daddy i blocked <@${user}>!!!! now pwease punch me!!!!!!!`)
                } else {
                    // Set blockedUsers to an array
                    file.blockedUsers = []

                    // Push the new user into the array
                    file.blockedUsers.push({
                        id: `${user}`,
                        adminBlock: admin
                    })
                    // Write the new guild config and send the confirm message
                    fs.writeFileSync(`./files/serverConfigs/${message.guild.id}.json`, JSON.stringify(file))
                    message.channel.send(`daddy i blocked <@${user}>!!!! now pwease punch me!!!!!!!`)
                }
                f.log('User was blocked.')
            } else message.channel.send("haha very funni but pleae specify a user by mentioning him/her") // Send "no ping" message
        } else message.channel.send("who tf do you want me to block?") // Send "no ping" message
    }
}