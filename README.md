# Obot-ma :TM:
The Bot for JCIgaming's Discord
## Description

The bot for JCIgaming's Discord server. <br>
Obot-ma is based on the interstellar bot and I still call it Interstellar sometimes lmao.

## How to install.
1. Make sure you have Node.js installed.
2. Clone the repository and run `npm install` in the folder.
3. Type `node bot.js`
4. Type in your bot token.
5. You are done!

## Launch options
Wanna disable the console? Or have no colours? Well, we have launch options!
`npm start` will launch the option `logconsole` enabled. But I will first tell you what we have:
- `noconsole` - Disables all console output.
- `debug` - Will output debug messages to the console.
- `nowrite` - Disables log file writting. *NOTE:* `logconsole` will override this for it's writes.
- `logconsole` - Writes all console output into the log file.
- `showfilestart` - Shows the file start.
- `nocolour` - Disables colour in the console.

To enable one of these just have it in the args when starting the bot. So:
`node bot.js [launch options]`
These have to be seperated by spaces. So if we would want to disable colour and have all debug output put into the console we would do:
`node bot.js nocolour debug`

## Making a new command or eventhandler.
Have you ever wanted to make a new command or something similar? Read the instructions below.

#### Making a command.
To make a new **command** you need to put a *JavaScript* file into the `commands` directory. Like `hello.js`. The filename is the name of the command, so if you name it `hello.js`, the user would need to type (*NOTE: The prefix in our example is '!'*) `!hello` for the command to execute. If there are files in the `commands` directory that are not JavaScript files, an error will occur.
Once you create the JavaScript file, you need to structure your file in a way that will work correctly with other code used by the bot. Provided is the command file structure, with the example being a `hello` command. 
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

#### Making an event handler.
First off: Event handlers need a special error handler or they will just kill the bot. They look like this:
```javascript
try {
    // Code goes here
} catch (err) {
    let error = `${err}\n\n${err.stack}`
    let date = new Date()
    let iso_date = date.toISOString()
    let log_filename = `${iso_date}_${module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3)}`

    fs.writeFileSync(`./files/log/${log_filename}.txt`, error)
    console.log(colors.red(`An error occured! The error can be found in /files/log/${log_filename}.txt`))
}
```
So... how do you make a event handler? Well, the process is similar to making a command... with a few exceptions. You start with a simple `module.exports` and a `run`.
The `run` function only requires the `client` parameter. For the event to be run, you must ensure the event handler file is in the  `eventhandlers` folder. The file name also does not matter, you can name it like you want.
*NOTE: Anything that isn't a JavaScript file and doesn't have the `run` export attribute will cause an error.*
An example would be: 
```javascript
const discord = require('discord.js');
module.exports = {
    run: function (client) {
        client.once('ready', () => {
            console.log("Hello World")
        });
    }
}
```
This will print 'Hello World' into the console when the bot logs in.

#### Useful functions.
Stuff like making an embed sure sucks but i made some functions to do the heavy lifting for us! So... What do we have? Well we have:
##### **embed** (channel, title, colour, message, returnEmbedOnly)
This makes and sends an embed or returns it.
`Channel` (*Chanel Object*): The channel the message gets send to.
`Title` (*String*): The title of the embed.
`colour` (*Number*): The colour of the embed.
`message` (*String*): The description of the embed.
`returnEmbedOnly` (*Boolean* and optional): If this is true, the function returns the embed object and does not send the message.
##### **getServerConfig** (guildID) 
This returns the server config for the guildID provided.
`guildID` (*String*): The guildID for the server config.
##### **randomInt** (min,max)
This returns a random number with the vaules specified.
`min` (*Int*): The minimum number.
`max` (*Int*): The maximum number.
##### **config** ()
Returns the bot config.
##### **execute** (command, message, client, prefix, args)
Executes a command.
`command` (*String*): The command to execute.
`message` (*MessageObject*): The message object for the command that will be executed
`client` (*DJS Client object*): The client for the command.
`prefix` (*String*): The prefix for the command.
`args` (*Array*): The args for the command.
#### **error** (err, customFileName, sendConsoleLog)
Handles errors for you. So if you have any try catch you need handled, send it to this function!
`err` (*Error object*): The error
`customFileName` (*String*): A custom name that will appear in the file
`sendConsoleLog` (*Boolean*): If this is true, a message will apear in the console.
#### **log** (log, customStackNum, override, msgOverride)
Logs something to log file with Time from where it came etc.
`log` (*String*): The thing to log to the log file
`customStackNum` (*Int*): The stack number that should be used. *NOTE:* The stacknumber is the location from where the log was called. Like in the stacktrace
`override` (*Object*): Is logging turned off? Well, just turn it on with this! Use it like this: `{devMode: true, writeLog: true}` This will turn writeLog and devMode on. So writing to the console and writting to the log file.
`msgOverride` (*String*): Overrides the seperator between the call location and the log message, leave undefined for default (>).

So what did we do today?
- [x] Make new commands
- [x] Make new event handlers
- [x] Learn how the functions work.
- [ ] Colonise 1/2 of the globe

## Rules
The rules are stored in `/files/important files/rules.txt` the code loops and every time there is a `^` in the rules file, it sends the previous text as a embed. 
Still confused? Well heres an example:
```
embed one!
^
embed two!
^
```
![Rule example](/files/images/Rules.png)

## Server Configs
The Server Configs work in a special way. The Configs are stored in the `./files/serverConfigs/` The Config file name is the guild ID of the server.
There is no real limit of what you can put in them since they are in a JSON format. An example config: 
```json
{
   "prefix":"?",
   "logging":"702274434207318181",
   "bot":"702242808081154082",
   "rules":"702242808081154082",
   "ruleMessages":[
      "827244232410267730",
      "827244233412444160"
   ],
   "blockedUsers":[
      {
         "id":"266965577799565312",
         "adminBlock":false
      }
   ]
}
```
The general template is:
```json
{
    "prefix": "!",
    "logging": ""
}
```

## All commands.
`<>` means its required, `[]` means its optional.

- 8ball
    > You ask a question, the 8ball will give you an answer.
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
    > Reads a config
    > **Usage** `config <config>`
- Dice
    > Roll the dice.
    > **Usage** `dice [min],[max]`
- Changelog
    > Gives you the most recent changelog.
- Eval
    > Executes JavaScript. *NOTE: Only the owner can use this command. Define the owner in the config file.*
- Execute
    > Executes a command. *NOTE: Only the owner can use this command. Define the owner in the config file.*
    **Usage** `execute <command> [args]`
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
