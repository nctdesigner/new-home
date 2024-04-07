//Importing all the required packages

const mongoose = require('mongoose'); // Importing mongoose for connecting to mongoDB
const { Schema } = mongoose; // Importing the schema feature of the mongoose to declare the scheme of the user data storage
const dotenv = require('dotenv');
dotenv.config()

const membersSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    id: {
        type: String,
        default: ""
    },
    inDate: {
        type: String,
        default: ""
    },
    outDate: {
        type: String,
        default: ""
    }
})

const TeamSchema = new Schema({
    _teamName: {
        type: String,
        required: true,
        min: 3
    },
    _teamAdmin: {
        type: String,
        required: true,
    },
    _teamPassword: {
        type: String,
        required: true
    },
    _teamMembers: [membersSchema],
    _teamTransactions: [membersSchema],
    _totalTransactionsOccured: {
        type: Number,
        default: 0
    },
    _totalCarrierCoins: {
        type: Number,
        default: 0
    },
})

// Converting the UserSchema to a model

const teams = mongoose.model('teams', TeamSchema); //Compliling the UserSchema to commerceFox registered users model

// Exporting the model to be used by other modules

module.exports = teams; //exporting the model Users

// Instant Chat MongoDB model codebase completed