// title: CommerceFox MongoDB model
// description: This is the module of the CommerceFox MongoDB
// version: 1.0.0
// date created: Feb 11, 2022
// author: Sarin Jaiswal


//Importing all the required packages

const mongoose = require('mongoose'); // Importing mongoose for connecting to mongoDB
const { Schema } = mongoose; // Importing the schema feature of the mongoose to declare the scheme of the user data storage
const dotenv = require('dotenv');
dotenv.config()

const BannersSchema = new Schema({
    _title: {
        type: String,
        required: true,
        min: 3
    },
    _subtitle: {
        type: String,
        required: true,
        min: 3
    },
    _name: {
        type: String,
        required: true,
        min: 3
    },
    _redirectText: {
        type: String,
        default: "Shop Now"
    },
    _redirectUrl: {
        type: String,
        default: ""
    },
    _image: {
        type: String,
        default: ""
    },
    _published: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

// Converting the UserSchema to a model

const Banners = mongoose.model('banners', BannersSchema); //Compliling the UserSchema to commerceFox registered users model


// Exporting the model to be used by other modules

module.exports = Banners; //exporting the model Users

// Instant Chat MongoDB model codebase completed