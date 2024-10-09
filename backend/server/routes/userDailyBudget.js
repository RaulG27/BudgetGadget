const express = require('express');
const router = express.Router();
const DailyBudget = require('../models/dailyBudgetModel');

// Route to create or update daily budget for a user
router.put('/daily', async (req, res) => {
    const { userid, amount } = req.body;
    
    if (!userid || amount === undefined) {
        return res.status(400).json({ message: 'User ID and amount are required' });
    }

    try {
        // Try to find the existing budget
        const budget = await DailyBudget.findOne({ userid });
        
        if (budget) {
            // Update the existing budget
            budget.amount = amount;
            const updatedBudget = await budget.save();
            return res.json(updatedBudget);
        } else {
            // Create a new budget if it doesn't exist
            const newBudget = new DailyBudget({
                userid,
                amount,
            });
            const savedBudget = await newBudget.save();
            return res.status(201).json(savedBudget);
        }
    } catch (error) {
        console.error('Error updating or creating daily budget:', error);
        res.status(500).json({ message: 'Error updating or creating daily budget' });
    }
});

// Route to get daily budget for a user
router.get('/daily', async (req, res) => {
    const { userid } = req.query; // Get userid from query parameters

    if (!userid) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const budget = await DailyBudget.findOne({ userid }); // Find the budget by user ID
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' }); // Handle case where budget doesn't exist
        }
        res.json(budget); // Return the found budget
    } catch (error) {
        console.error('Error fetching daily budget:', error); // Log the error
        res.status(500).json({ message: 'Error fetching daily budget' }); // Send error response
    }
});

module.exports = router;
