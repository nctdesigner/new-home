//Importing all the required packages

const mongoose = require('mongoose'); // Importing mongoose for connecting to mongoDB
const { Schema } = mongoose; // Importing the schema feature of the mongoose to declare the scheme of the user data storage
const dotenv = require('dotenv');
dotenv.config()

const ordersItemsSchema = new Schema({
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

const OrdersSchema = new Schema({
    _userId: {
        type: String,
        required: true,
        min: 3
    },
    _orderDate: {
        type: String,
        required: true
    },
    _orderNo: {
        type: String,
        required: true
    },
    _orderAddress: {
        type: String,
        default: ""
    },
    _orderDeliveryDays: {
        type: Number,
        default: 7
    },
    _orderDeliveryDate: {
        type: String,
        default: ""
    },
    _orderNetAmount: {
        type: Number,
        default: 0
    },
    _orderTotalAmount: {
        type: Number,
        default: 0,
    },
    _orderTotalGst: {
        type: Number,
        default: 0
    },
    _orderNetGst: {
        type: Number,
        default: 0
    },
    _orderGstParam: {
        type: Number,
        default: 0
    },
    _orderTotalDiscount: {
        type: Number,
        default: 0
    },
    _orderNetDiscount: {
        type: Number,
        default: 0
    },
    _orderDiscountParam: {
        type: Number,
        default: 0
    },
    _orderMode: {
        type: String,
        default: "pending"
    },
    _orderCashback: {
        type: Number,
        default: 0
    },
    _orderItems: [ordersItemsSchema],
})

// Converting the UserSchema to a model

const orders = mongoose.model('orders', OrdersSchema); //Compliling the UserSchema to commerceFox registered users model

// Exporting the model to be used by other modules

module.exports = orders; //exporting the model Users

// Instant Chat MongoDB model codebase completed