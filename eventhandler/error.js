try {
    const functions = require("../functions.js")
    const discord = require('discord.js');
    const colors = require("colours")

    var colourInfo = functions.config().messageColours.info;
    var colourWarn = functions.config().messageColours.warn;
    var colourMember = functions.config().messageColours.member;

    module.exports = {
        run: function (client) {
            client.on('error', (error) => {
                //console.log(colors.red("A Client error occured: " + error))
            });
        }
    }
} catch (error) {
    const colors = require("colours")
    const fs = require('fs')
    const path = require('path');

    let error2 = `${error}\n\n${error.stack}`

    let date = new Date()

    let finnal = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "_" + date.getSeconds() + "_" + module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3);
    //let finnal = `${date.getDate}_${date.getMonth}_${date.getFullYear}:${date.getSeconds}:${module.filename}.txt`
    fs.writeFileSync(`./files/log/${finnal}.txt`, error2)
    console.log(colors.red(`An error occured! The error can be found in ./files/log/${finnal}.txt`))
}