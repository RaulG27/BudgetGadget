// routes/userFinancialEntry.js
const express = require('express');
const router = express.Router();
const FinancialEntry = require('../models/financialEntryModel');

// Route to create a financial entry
router.post('/entries', async (req, res) => {
    const { userid, amount, type, date } = req.body;

    // Validate the input
    if (!userid || !amount || !type || !date) {
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
            date: new Date(date) // Ensure date is a valid Date object
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
        const entries = await FinancialEntry.find();
        
        // Send the fetched entries as a response
        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching financial entries:', error);
        res.status(500).json({ message: 'Error fetching financial entries' });
    }
});

module.exports = router;
