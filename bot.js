//defining all needed things
const fs = require("fs")
const colors = require('colours')
const discord = require("discord.js")
const readline = require("readline")

console.log("Starting bot...")
console.log("Starting client!")
//defining the client
const client = new discord.Client();
//if the token file is there it will just continue booting if not it will ask
//creating readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//defining a token function
function token() {
    rl.question("Token: ", (answer) => {
        fs.unlinkSync("./files/important files/token.txt")
        fs.writeFileSync("./files/important files/token.txt", answer)
        client.login(fs.readFileSync("./files/important files/token.txt", 'utf-8')).then(() => {
            rl.close()
        }).catch((error) => {
            //if it errors
            if (error.code == "TOKEN_INVALID") {
                console.log(colors.red("Error: ") + "The token provided is invalid!")
                token()
            } else {
                console.log(colors.red("Unknown error: " + error))
            }
        })
    });
}

try {
    fs.readFileSync("./files/important files/token.txt")
    console.log("Starting files!")
    let files = fs.readdirSync("./eventhandler/")
    //starting all files by running through them
    for (let index = 0; index < files.length; index++) {
        var commandFile = require(`./eventhandler/${files[index]}`);
        console.log(colors.yellow(`Started: ${files[index]}`));
        commandFile['run'](client);
    }
    console.log(colors.green("All files started, logging in!"))
    client.login(fs.readFileSync("./files/important files/token.txt", 'utf-8')).then(() => {
        rl.close()
    }).catch((error) => {
        //if it errors
        if (error.code == "TOKEN_INVALID") {
            console.log(colors.red("Error: ") + "The token provided is invalid!")
            token()
        } else {
            console.log(colors.red("Unknown error: " + error))
        }
    })
} catch (error) {
    console.log(colors.red("Error: ") + "token is missing!")

    //ask the user for the token
    rl.question("Token: ", (answer) => {
        //write the token
        fs.writeFileSync("./files/important files/token.txt", answer)
        console.log("Starting files!")
        let files = fs.readdirSync("./eventhandler/")
        for (let index = 0; index < files.length; index++) {
            var commandFile = require(`./eventhandler/${files[index]}`);
            //commandFile['run'](client);
            console.log(colors.yellow(`Started: ${files[index]}`));
        }
        console.log(colors.green("All files started, logging in!"))
        //log into the client using the token file
        client.login(fs.readFileSync("./files/important files/token.txt", 'utf-8')).then(() => {
            rl.close()
        }).catch((error) => {
            //if it errors
            if (error.code == "TOKEN_INVALID") {
                console.log(colors.red("Error: ") + "The token provided is invalid!")
                token()
            } else {
                console.log(colors.red("Unknown error: " + error))
            }
        })
    });
}

process.on("unhandledRejection", () => {

});