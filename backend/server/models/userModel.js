const mongoose = require('mongoose');

// Define the user schema
const newUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    favorite_stocks: {
        type: [String], // Array of stock symbols
        default: [],
    },
}, { collection: 'users' }); // Explicitly specify the collection name

// Create and export the User model
const User = mongoose.model('User', newUserSchema);
module.exports = User;
