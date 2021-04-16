// Modules
const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require('dotenv');
const fs = require("fs")

console.log("Obot-ma is starting...")

// Load variables from environment file
dotenv.config()

// Open Discord event modules
let event_files = fs.readdirSync("./events/")
for (let i = 0; i < event_files.length; i++) {
    let event_file = require(`./events/${event_files[i]}`)
    event_file["run"](client)
}

// When the client successfully logs in
client.on('ready', () => {
    console.log(`Obot-ma is online!`);
});

// Login the Discord client
console.log("Obot-ma is going online!")
client.login(process.env.TOKEN)