// Modules
const { Client } = require("pg")

// Connect to databse
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    database: "obotma",
    port: 5432
})

client.connect()

const query = async (text, params) => {
    return await client.query(text, params);
}

// Functions
module.exports = {
    query: query
}