const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Function to connect to MongoDB
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
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("The backend has connected to the MongoDB database.");
    } catch (error) {
        // Log the error and exit the process
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with a failure code
    }
};

// Export the function for use in other parts of the application
module.exports = connectDB;
