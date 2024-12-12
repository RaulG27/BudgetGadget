const express = require('express');
const router = express.Router();
const FinancialEntry = require('../models/financialEntryModel');

// Route to create a financial entry
router.post('/entries', async (req, res) => {
    const { userid, amount, type, date, comments, recurring_cost } = req.body;
    console.log('Received request body:', req.body);

    // Validate the input
    if (!userid || amount === undefined || !type || !Array.isArray(recurring_cost) || recurring_cost.length === 0) {
        return res.status(400).json({ message: 'All fields are required and recurring_cost must be an array' });
    }

    // Ensure the type is either 'income' or 'expense'
    if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ message: 'Type must be either "income" or "expense"' });
    }

    // Ensure all values in recurring_cost are valid
    const validRecurringCosts = ['Housing', 'Utilities', 'Food', 'Entertainment', 'Savings', 'Transportation', 'Miscellaneous'];
    const invalidCosts = recurring_cost.filter(cost => !validRecurringCosts.includes(cost));
    if (invalidCosts.length > 0) {
        return res.status(400).json({ message: `recurring_cost must be one of: ${validRecurringCosts.join(', ')}` });
    }

    try {
        const newEntry = new FinancialEntry({
            userid,
            amount,
            type,
            date: date ? new Date(date) : new Date(),
            comments: comments || '',
            recurring_cost // Ensure this is included as an array
        });

        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error('Error saving financial entry:', error);
        res.status(500).json({ message: 'Error saving financial entry', error: error.message });
    }
});

// Route to fetch financial entries for a specific user
router.get('/entries', async (req, res) => {
    const { userid } = req.query;

    if (!userid) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Fetch financial entries for the specific user
        const entries = await FinancialEntry.find({ userid }).sort({ date: -1 }); // Filter by userid and sort by date
        
        // Send the fetched entries as a response
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching financial entries:', error);
        res.status(500).json({ message: 'Error fetching financial entries' });
    }
});

// Add this new route for deleting a financial entry
router.delete('/entries/:entryId', async (req, res) => {
    const { entryId } = req.params;

    try {
        // Find and delete the entry
        const deletedEntry = await FinancialEntry.findByIdAndDelete(entryId);

        // If no entry was found, return a 404 error
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        // Return a success response
        res.status(200).json({ 
            message: 'Entry deleted successfully', 
            deletedEntry 
        });
    } catch (error) {
        console.error('Error deleting financial entry:', error);
        res.status(500).json({ 
            message: 'Error deleting financial entry', 
            error: error.message 
        });
    }
});

module.exports = router;