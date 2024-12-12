const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        // Set Mongoose options
        mongoose.set('strictQuery', false); // Adjust based on your preference

        // Get the MongoDB URI from environment variables
        const dbURI = process.env.ATLAS_URI;

        if (!dbURI) {
            throw new Error('MongoDB URI (ATLAS_URI) is not defined in environment variables.');
        }

        // Connect to MongoDB
        await mongoose.connect(dbURI);

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error; // Re-throw the error to be caught in server.js
    }
};

module.exports = connectDB;
