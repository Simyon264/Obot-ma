// Modules
const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require('dotenv');
const fs = require("fs");
const config = require("./config.json")
const db = require("./db")

console.log("Obot-ma is starting...")

// Load variables from environment file
dotenv.config()

// Open Discord event modules
let event_files = fs.readdirSync("./events/")
for (let i = 0; i < event_files.length; i++) {
    let event = require(`./events/${event_files[i]}`)
    event.run(client)
}

// Login the Discord client
console.log("Obot-ma is going online!")
client.login(process.env.TOKEN)

// When the client successfully logs in
client.on('ready', () => {
    console.log(`Obot-ma is online!`);
});

/* This catches errors that where not caught by try catch blocks. 
This is very important. Without this, the whole bot goes down. */
process.on('uncaughtException', function (err) {
    console.log(err)
})