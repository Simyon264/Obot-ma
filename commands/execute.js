const f = require('../functions.js');

module.exports = {
    name: 'execute',
    description: 'Executes a command',
    category: 'owner',
    modcommand: true,
    blockCMD: true,
    usage: 'execute <command> [args]',
    perms: '',
    alias: ["ex"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        f.log('Checking for owner...')
        if (message.author.id == f.config().special.owner) { // Check for owner
            f.log('Check passed.')
            if (args.length >= 2) { // The if a command to execute was specifed
                const argsN = message.content.split(" ").slice(1); // Get the new args to pass onto the command
                if (args[1] == "execute") return message.channel.send("no"); // If the command you are trying to execute is this one, dont execute it
                message.channel.send('ok fam i gotchu')
                let returnCode = f.execute(args[1], message, client, prefix, argsN) // Execute the command
                switch (returnCode.code) {
                    case 0:
                        message.channel.send('yeah fam i did it')
                        break;
                    case 1:
                        message.channel.send('that command is not a thing you stupid bich')
                        break;
                    case 2:
                        message.channel.send('something broke lmao')
                        f.log(`${returnCode.error}\n${returnCode.stack}\n${returnCode.error.code}`, 2, "EXECUTE > ")
                        break;
                    default:
                        message.channel.send(`unknown code lmao ${returnCode.code}`)
                        break;
                }
            } else message.channel.send('bruh you need to specify what command i need to execute...')
        } else {
            message.channel.send("yo bruh you aint my owner, im not doing this shit for you")
            f.log('User is not owner.')
        }
    }
}