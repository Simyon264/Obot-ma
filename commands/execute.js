const f = require('../functions.js');

module.exports = {
    name: 'execute',
    description: f.localization("commands","execute","exports").description,
    category: 'owner',
    modcommand: true,
    blockCMD: true,
    usage: f.localization("commands","execute","exports").usage,
    perms: '',
    alias: ["ex"],
    cooldown: 1,
    run: function (message, prefix, args, client) {
        f.log('Checking for owner...')
        if (message.author.id == f.config().special.owner) { // Check for owner
            f.log('Check passed.')
            if (args.length >= 2) { // The if a command to execute was specifed
                const argsN = message.content.split(" ").slice(1); // Get the new args to pass onto the command
                if (args[1] == "execute") return message.channel.send(f.localization("commands","execute","executemsg")); // If the command you are trying to execute is this one, dont execute it
                message.channel.send(f.localization("commands","execute","confirm"))
                let returnCode = f.execute(args[1], message, client, prefix, argsN) // Execute the command
                switch (returnCode.code) {
                    case 0:
                        message.channel.send(f.localization("commands","execute","commandconfirm"))
                        break;
                    case 1:
                        message.channel.send(f.localization("commands","execute","nocommand"))
                        break;
                    case 2:
                        message.channel.send(f.localization("commands","execute","errorknown"))
                        f.log(`${returnCode.error}\n${returnCode.stack}\n${returnCode.error.code}`, 2, "EXECUTE > ")
                        break;
                    default:
                        message.channel.send(f.localization("commands","execute","default",[returnCode.code]))
                        break;
                }
            } else message.channel.send(f.localization("commands","execute","noargs"))
        } else {
            message.channel.send(f.localization("commands","execute","noperms"))
            f.log('User is not owner.')
        }
    }
}