// userFavoriteCryptos.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Test route to verify the router is working
router.get('/favorites/test', (req, res) => {
    res.json({ message: 'Favorites route is connected' });
});

// Route to add a favorite crypto
router.post('/cryptos/favorites', async (req, res) => {
    const { userId, symbol } = req.body;
    console.log('Received request with userId:', userId, 'and symbol:', symbol);

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                searchedId: userId,
            });
        }

        if (!user.favorite_cryptos.includes(symbol)) {
            user.favorite_cryptos.push(symbol);
            await user.save();
            return res.status(200).json({
                message: 'Crypto added successfully',
                favorites: user.favorite_cryptos,
            });
        }

        return res.status(200).json({
            message: 'Crypto already in favorites',
            favorites: user.favorite_cryptos,
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});

// Route to delete a favorite crypto
router.delete('/cryptos/favorites', async (req, res) => {
    const { userId, symbol } = req.body;
    console.log('Received request to delete favorite with userId:', userId, 'and symbol:', symbol);

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Remove the symbol from the user's favorites
        user.favorite_cryptos = user.favorite_cryptos.filter(fav => fav !== symbol);
        await user.save();

        return res.status(200).json({
            message: 'Crypto removed successfully',
            favorites: user.favorite_cryptos,
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});

// Route to get user's favorite cryptos by userId
router.get('/cryptos/favorites/:userId', async (req, res) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            favorites: user.favorite_cryptos,
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
});

// Route to get user by ID for cryptos (including favorites)
router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            username: user.username,
            favorite_cryptos: user.favorite_cryptos,
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
