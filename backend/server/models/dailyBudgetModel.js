// Schema for daily budgets
const mongoose = require('mongoose');

// Schema for daily budgets
const dailyBudgetSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0 // Ensure that the budget amount is non-negative
    },
    date: {
        type: Date,
        default: Date.now // Automatically sets to current date
    }
}, {
    collection: 'daily_budgets',
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the DailyBudget model from the schema
const DailyBudget = mongoose.model('DailyBudget', dailyBudgetSchema);

// Export the model for use in other parts of the application
module.exports = DailyBudget;
