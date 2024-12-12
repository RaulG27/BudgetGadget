const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.get('/api/stocks/:symbol', async (req, res) => {
    const apiKey = process.env.TWELVE_DATA_API_KEY; // Your API key from .env
    console.log('API Key:', apiKey); // Log the API key for debugging
    const symbol = req.params.symbol; // Get the stock symbol from the request parameters
    const url = `https://api.twelvedata.com/stocks/${symbol}?apikey=${apiKey}`; // Use the symbol in the API request

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Twelve Data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;
