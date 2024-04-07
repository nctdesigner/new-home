const mongoose = require('mongoose');
const generateConnectionUrl = require("../lib/connection-url-generator")


const mongoURI = process.env.NEXT_PUBLIC_NCT_DATABASE_URI;
const connection_string = generateConnectionUrl(58)


const connectToMongoDB = async () => {
    mongoose
        .connect(mongoURI)
        .then(() => {
            console.log("X--- NCT database connected succesfully ---X")
            console.log(`X--- NCT database connection url: ${connection_string} ---X`)
        })
        .catch(err => console.log(err));
}


// Exporting the function to be used by other modules

module.exports = connectToMongoDB; // exporting the connectToMongoDB function

// Db server codebase completed