const express = require('express');
const router = express.Router();
const FinancialEntry = require('../models/financialEntryModel');

// Route to create a financial entry
router.post('/entries', async (req, res) => {
    const { userid, amount, type, date, comments } = req.body; // Include comments

    // Validate the input
    if (!userid || !amount || !type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Ensure the type is either 'income' or 'expense'
    if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ message: 'Type must be either "income" or "expense"' });
    }

    try {
        // Create a new financial entry
        const newEntry = new FinancialEntry({
            userid,
            amount,
            type,
            date: date ? new Date(date) : new Date(), // Set current date if not provided
            comments: comments || '' // Set comments, default to empty string
        });

        // Save the financial entry to the database
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error('Error saving financial entry:', error);
        res.status(500).json({ message: 'Error saving financial entry' });
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
