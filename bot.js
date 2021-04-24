// Modules
const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require('dotenv');
const fs = require("fs");
const config = require("./config.json")
const db = require("./db")
const readline = require("readline");

console.log("Obot-ma is starting...")

// Readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Load environment variables
dotenv.config()

// Ask question on readline using promises
function readlinePromise(message) {
    return new Promise((resolve, reject) => {
        rl.question(message, (answer) => {
            resolve(answer);
        });
    })
}

/* This catches errors that where not caught by try catch blocks. 
This is very important. Without this, the whole bot goes down. */
process.on('uncaughtException', (err) => {
    console.log(err)
})
process.on('unhandledRejection', async (err) => {
    if (err.code == "TOKEN_INVALID") {
        // Ask for a new token, because the old one is no longer valid
        let token = await readlinePromise("Invalid token. Please enter Bot Token: ")
        fs.writeFileSync("./.env", `TOKEN="${token}"`)
        process.env.TOKEN = token

        // Try to start the bot again
        start()
    } else {
        console.log(err)
    }
});

async function start() {
    // Ask for token if it is missing
    if (!process.env.TOKEN) {
        let token = await readlinePromise("Token not found. Please enter Bot Token: ")
        fs.writeFileSync("./.env", `TOKEN="${token}"`)
        
        process.env.TOKEN = token
    }

    // Open Discord event modules
    let event_files = fs.readdirSync("./events/")
    for (let i = 0; i < event_files.length; i++) {
        let event = require(`./events/${event_files[i]}`)
        event.run(client)
    }

    // Login the Discord client
    console.log("Obot-ma is going online!")
    client.login(process.env.TOKEN)
}

start()

// When the client successfully logs in
client.on('ready', () => {
    console.log(`Obot-ma is online!`);
    rl.close()
});