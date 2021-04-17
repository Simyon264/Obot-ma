// Imports
const fs = require("fs") // Filesystem
const discord = require("discord.js") // discord.js.... you should know this
const colors = require('colours') // used to print custom colours in the terminal
const readline = require("readline") // used for user to input bot token
const f = require('./functions.js')
// Defining general vars
global.devMode = false;
global.writeLog = false;

// Get args from the command that was used to start the bot
const args = process.argv.slice(2);
// Run through every args and execute some code if its a valid args
for (let index = 0; index < args.length; index++) {
    //This will just set some vars to true 
    switch (args[index]) {
        case "dev":
            devMode = true;
            console.log(colors.magenta("Debug mode") + " is now enabled")
            break;
        case "write":
            writeLog = true;
            console.log(colors.magenta("Debug write") + " is now enabled")
            break;
        default:
            console.log(colors.red(`Argument `) + colors.yellow(args[index]) + colors.red(" is not supported."))
            break;
    }
}

if (writeLog) console.log("The debug log can be found in /log/latest.log")

console.log("Starting bot...")
const client = new discord.Client(); // discord client

// Start readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask user for token, and store it
function token() {
    rl.question("Enter a Discord Bot Token: ", (answer) => {
        fs.writeFileSync("./files/important files/token.txt", answer)
        start()
    });
}

// Start bot
function start() {
    try {
        let token = fs.readFileSync("./files/important files/token.txt", "utf-8")

        console.log("Starting files!")
        let files = fs.readdirSync("./eventhandler/")

        // Start event handlers
        for (let i = 0; i < files.length; i++) {
            let event = require(`./eventhandler/${files[i]}`);
            console.log(colors.yellow(`Started: ${files[i]}`));
            event['run'](client);
        }
        console.log(colors.green("All files started, logging in!"))

        try {
            // Login using token
            client.login(token)
                .then(() => {
                    // Stop readline
                    rl.close()
                })
        } catch (err) {
            // If the error is not a token invalid error, throw it
            if (err.code !== "TOKEN_INVALID") throw err;
            console.log(colors.red("Error: ") + "The token provided is invalid!")
            token()
        }

    } catch (err) {
        // If the error is not a file not found error, throw it
        if (err.code !== "ENOENT") throw err;
        console.log(colors.red("Error: ") + "token is missing!")
        token();
    }
}

// Call start function
start();

// NOTE: Discord.js is stupid and without that a perms error without a catch would kill the bot. Even a try catch cant stop that error. TL:DR its the last fail safe - Simon
// This line makes me very uncomfortable - Joshua
// I'll work hard to try and remove this - Joshua
// And I will work hard to keep this in! - Simon
process.on("unhandledRejection", (err) => {
    f.log(`\nunhandledRejection!\n${err}\n\n${err.stack}`)
});

process.on('uncaughtException', (err) => {
    f.log(`\nuncaughtException!\n${err}\n\n${err.stack}`)
})

process.on('message', (msg) => {
    f.log(msg)
})

function exit(code) {
    process.stdin.resume(); //so the program will not close instantly
    console.log('Destroying client...')
    f.log('Exiting...')
    client.destroy()
    process.exit(code)
}

process.on('SIGINT', () => {
    exit(0)
})