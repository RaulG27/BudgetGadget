// userFavoriteStocks.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Add this test route to verify the router is working
router.get('/favorites/test', (req, res) => {
    res.json({ message: 'Favorites route is connected' });
});

router.post('/favorites', async (req, res) => {
    const { userId, symbol } = req.body;
    console.log('Received request with userId:', userId, 'and symbol:', symbol);

    try {
        // Try finding the user without any ID conversion first
        let user = await User.findOne({ _id: userId });
        console.log('Found user:', user); // Debug log

        if (!user) {
            // If user not found, try with a different query
            user = await User.findById(userId);
            console.log('Second attempt found user:', user); // Debug log
        }

        if (!user) {
            // List all users in the database for debugging
            const allUsers = await User.find({}, '_id');
            console.log('All user IDs in database:', allUsers);
            
            return res.status(404).json({ 
                message: 'User not found.',
                searchedId: userId,
                availableIds: allUsers.map(u => u._id)
            });
        }

        // If we get here, we found the user
        if (!user.favorite_stocks.includes(symbol)) {
            user.favorite_stocks.push(symbol);
            await user.save();
            return res.status(200).json({
                message: 'Stock added successfully',
                favorites: user.favorite_stocks
            });
        }

        return res.status(200).json({
            message: 'Stock already in favorites',
            favorites: user.favorite_stocks
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// route to handle deleting a favorite stock
router.delete('/favorites', async (req, res) => {
    const { userId, symbol } = req.body;
    console.log('Received request to delete favorite with userId:', userId, 'and symbol:', symbol);

    try {
        let user = await User.findOne({ _id: userId });
        console.log('Found user:', user); // Debug log

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Remove the stock from favorites if it exists
        user.favorite_stocks = user.favorite_stocks.filter(fav => fav !== symbol);
        await user.save();
        
        return res.status(200).json({
            message: 'Stock removed successfully',
            favorites: user.favorite_stocks
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// Add a route to get user by ID
router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Return the user object, including favorite_stocks
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;