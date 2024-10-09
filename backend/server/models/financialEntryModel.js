// models/financialEntryModel.js
const mongoose = require('mongoose');

// Define the schema for a financial entry
const financialEntrySchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // User ID must be provided
    },
    amount: {
        type: Number,
        required: true // Amount must be provided
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // Must be either 'income' or 'expense'
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Automatically sets to current date if not provided
    },
    comments: {
        type: String,
        default: '' // Default to an empty string
    },
    isRecurring: {
        type: Boolean,
        default: false // Default to false
    }
}, {
    collection: 'financial_entries',
    
});

// Create the model from the schema
const FinancialEntry = mongoose.model('FinancialEntry', financialEntrySchema);

// Export the model for use in other files
module.exports = FinancialEntry;

