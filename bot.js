//defining all needed things
const fs = require("fs")
const colors = require('colours')
const discord = require("discord.js")
const readline = require("readline")

console.log("Starting bot...")
//if the token file is there it will just continue booting if not it will ask
try {
    fs.readFileSync("./token.txt")
    console.log("Starting bot!")
    //defining client
    const client = new discord.Client();
    console.log("Starting files!")
    let files = fs.readdirSync("./eventhandler/")
    //starting all files by running through them
    for (let index = 0; index < files.length; index++) {
        var commandFile = require(`./eventhandler/${files[index]}`);
        commandFile['run'](client);
    }
    console.log(colors.green("All files started, logging in!"))
    client.login(fs.readFileSync("./token.txt",'utf-8'))
} catch (error) {
    console.log(colors.red("Error: ") + "token is missing!")

    //creating readline interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    //ask the user for the token
    rl.question("Token: ", (answer) => {
        //write the token
        fs.writeFileSync("./token.txt", answer)
        console.log("Starting bot!")
        //defining the client
        const client = new discord.Client();
        console.log("Starting files!")
        let files = fs.readdirSync("./eventhandler/")
        for (let index = 0; index < files.length; index++) {
            var commandFile = require(`./eventhandler/${files[index]}`);
            commandFile['run'](client);
        }
        console.log(colors.green("All files started, logging in!"))
        //log into the client using the token file
        client.login(fs.readFileSync("./token.txt", 'utf-8'))
        //closing the readline interface!
        rl.close()
    });
}
