
const mongoose = require("mongoose");

async function dbConnection() {
    const connect = await mongoose.connect(process.env.CONECTION_STRING)
    console.log(connect.connection.name);
}

module.exports = dbConnection;