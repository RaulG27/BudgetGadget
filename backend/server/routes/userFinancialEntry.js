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

// Route to fetch all financial entries
router.get('/entries', async (req, res) => {
    try {
        // Fetch all financial entries from the database
        const entries = await FinancialEntry.find().sort({ date: -1 }); // Sort entries by date, newest first
        
        // Send the fetched entries as a response
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching financial entries:', error);
        res.status(500).json({ message: 'Error fetching financial entries' });
    }
});

module.exports = router;