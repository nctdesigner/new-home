//Importing all the required packages

const mongoose = require('mongoose'); // Importing mongoose for connecting to mongoDB
const { Schema } = mongoose; // Importing the schema feature of the mongoose to declare the scheme of the user data storage
const dotenv = require('dotenv');
dotenv.config()


const ReferralCode = new Schema({
    _userId: {
        type: String,
        required: true,
        min: 3
    },
    _referralCode: {
        type: String,
        required: true,
        min: 6
    },
    _teamId: {
        type: String,
        required: true,
        min: 3
    },
    _teamPassword: {
        type: String,
        default: "",
    }
})

// Converting the UserSchema to a model

const refCodes = mongoose.model('refCodes', ReferralCode); //Compliling the UserSchema to commerceFox registered users model

// Exporting the model to be used by other modules

module.exports = refCodes; //exporting the model Users

// Instant Chat MongoDB model codebase completed