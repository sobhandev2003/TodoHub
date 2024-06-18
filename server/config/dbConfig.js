
const mongoose = require("mongoose");

async function dbConnection() {
    const connect = await mongoose.connect(process.env.CONECTION_STRING)
}

module.exports = dbConnection;