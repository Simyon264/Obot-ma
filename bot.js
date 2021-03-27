// Imports
const fs = require("fs")
const discord = require("discord.js")
const colors = require('colours') // used to print custom colours in the terminal
const readline = require("readline") // used for user to input bot token

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
process.on("unhandledRejection", () => {});