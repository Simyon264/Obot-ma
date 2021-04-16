module.exports = {
    run: (client) => {
        client.on("message", (message) => {
           message.channel.send("Nobody asked.") 
        })
    }
}