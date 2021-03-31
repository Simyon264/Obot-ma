# Obot-ma :TM:
The Bot for JCIgaming's discord
## Description

The bot for JCIgaming's discord with features such as kick,ban,warn. You never know what will happen next. This project is closed source but some people have access to it.
Obot-ma is based on the interstellar bot and i still call it Interstellar sometimes lmao.

## How to install.
1. Make sure you have Node.js installed.
2. Clone the repository and run `npm install` in the folder.
3. Type `node bot.js`
4. Type in your bot token.
5. You are done!

## Making a new command or eventhandler.
Did you ever want to make a new command or something like that? Well im going to teach you that!

#### Making a command.
To make a new **command** you need to put a *JS* file into the commands folder. Like `hello.js`. The file name is the command name, so if you name it `hello.js` the command will execute when the user inputs (*NOTE The prefix in our example being '!'*) `!hello` the command will execute. If there is a file that does not have the `.js` it will error.
Once the file is made you need to put a few things in it so it doesn't error while searching for the aliases or while running it. Still confused? Let me just give you an example: 
```javascript
module.exports = {
    name: 'hello', // This is the title when you run the help command.
    description: 'Hello... World...', // This is the description displayed when you run the help command.
    category: 'general', // This is the category displayed when you run the help command.
    modcommand: false, // If this is true, this command can be executed in a non bot channel.
    blockCMD: false, // If this is true, the command can be executed even if blocked. (This is not needed for the bot to not error when running the command)
    usage: 'hello', // The usage displayed when you run the help command.
    perms: '', // A permission check line. The bot will check this line and run a permission check. (Example permission: 'MANAGE_GUILD')
    alias: ["world"], // Aliases checked by message.js.
    cooldown: 1, // Cooldown in seconds.
    run: function (message, prefix, args, client) { 
        // This code will execute once the command executes
        // message => the message object.
        // message.channel => the channel object.
        // message.channel.send() => A function that sends a message to the channel
        message.channel.send("World!") // This sends 'World!' into the channel that the command was executed in.
    }
}
```
#### What gets passed on when the command is run.
You may wonder: What is getting passed so you know what you can use. Well...
- client - This is the client object. With this you can get stuff like the ping. (client.ws.ping)
- message - The message object. Used for getting the channel or the author etc.
- prefix - The prefix that the command was executed with. I dont even know why its there but it is.
- args - The args the command was executed with. (It's an array btw)

#### Making a eventhandler.
First off: These eventhandlers need a special error handler or they will just kill the bot.
So... How do you make a eventhandler? Well its just like making a command... just without the command stuff... Well you start with a simple `module.exports` and a `run`.
The run function only needs the client parameter as that is the only thing passed from bot.js. You then need to run the events you want to run... Where do you put the file?
Well in the `eventhandlers` folder! The file name also does not matter at all, you can name it like you want.
*NOTE: Anything that isn't a JS file and doesn't have the run export will error the bot.*
Oh and if you need an example: 
```javascript
const discord = require('discord.js');
module.exports = {
    run: function (client) {
        client.once('ready', () => {
            console.log("I'm ALIVE!!!!!!!!!")
        });
    }
}
```
This will print 'I'm ALIVE!!!!!!!!' into the console when the bot is logged in.

So what did we learn today?
- [x] How to make new commands
- [x] How to make new eventhandlers
- [ ] Making bread

## All commands.

- 8ball
    > You ask a qeustion, the 8ball will give you an answer.
    > **Usage** `8ball <question>`
- About
    > Outputs a general 'about' page
- Avatar
    > Returns the avatar of a mentioned user.
    > **Usage** `avatar <userID | mentioned user>`
- Block
    > Block someone
    > **Usage** `block <user>`
- Care
    > Check who cared
    > **Usage** `care [anything]`
- Cap
    > Check how cap something is
    > **Usage** `cap [anything]`
- Config
    > Changes or reads a config
    > **Usage** `config <read <config>>`
- Dice
    > Roll the dice.
    > **Usage** `dice [min],[max]`
- Changelog
    > Gives you the most recent changelog.
- Eval
    > Executes JavaScript. *NOTE: Only the owner can use this command. Define the owner in the config file.*
- Help
    > Gives you a list of all commands or help for a specific command.
    > **Usage** `help [command]`
- Howgay
    > Look how gay someone is.
    > **Usage** `howgay [anything]`
- Meme
    > Gives you a random meme from a list of subreddits.
- Ping
    > Gives you the bot ping.
- Purge
    > Deletes a max of 500 messages.
    > **Usage** `purge <amount of messages>`
- Serverinfo
    > Shows the server info.
- Say
    > Make the bot say something.
    > **Usage** `say <what you want the bot to say>`
- Servericon
    > Gives you the server icon.
- Setlogchannel
    > Sets the log channel for the server.
    > **Usage** `setlogchannel <new log channel>`
- Setprefix
    > Sets the prefix for the server.
    > **Usage** `setprefix <newprefix>`
- Shutdown
    > Stops the bot. *NOTE: Only the owner can use this command. Define the owner in the config file.*
- Simp
    > How simp is someone? Find out by running this command.
    > **Usage** `simp [anything]`
- Unblock
    > Unblock someone
    > **Usage** `unblock <user>`
- Uptime
    > Gives the uptime
- Whoasked
    > Check you the fuck asked.
- Whowouldwin
    > Do you have a fight you need to break up? Break it up by running this command.
    > **Usage** `whowouldwin <person1>,<person2>`
- Yeet
    > Yeets someone.
    > **Usage** `yeet <anything or anyone>`
