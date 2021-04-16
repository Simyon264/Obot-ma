try {
    const fs = require("fs")
    const f = require("../functions.js")
    module.exports = {
        run: function (client) {

            fs.writeFileSync('./files/log/latest.log', '') // On start write the latest.log file to use.

            client.on('error', (error) => { //If the client errors/debug/warns
                f.log(error)
            });
            client.on('debug', (error) => {
                f.log(error)
            });
            client.on('warn', (error) => {
                f.log(error)
            });
        }
    }
} catch (err) {
    let error = `${type}\n\n${message}\n\n${err}\n\n${err.stack}`
    let date = new Date()
    let iso_date = date.toISOString()
    iso_date.replace(':', '.')
    let log_filename = `${iso_date}_${module.filename.slice(__filename.lastIndexOf(path.sep) + 1, module.filename.length - 3)}`

    fs.writeFileSync(`./files/log/${log_filename}.txt`, error)
    console.log(colors.red(`An error occured! The error can be found in /files/log/${log_filename}.txt`))
}