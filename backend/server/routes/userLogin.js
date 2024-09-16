const express = require("express");
const router = express.Router();
const { userLoginValidation } = require('../models/userValidator');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../utilities/generateToken');

router.post('/login', async (req, res) => {
    console.log('Login Request Body:', req.body);

    const { error } = userLoginValidation(req.body);
    if (error) {
        console.log('Validation Error:', error.errors);
        return res.status(400).json({ message: error.errors[0].message });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        console.log('Fetched User:', user);

        if (!user) {
            console.log('User not found:', username);
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password Validity:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('Invalid password for user:', username);
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const accessToken = generateAccessToken(user._id, user.email, user.username);
        console.log('Generated Access Token:', accessToken);

        res.status(200).json({
            message: "Login successful",
            accessToken
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Server error during login" });
    }
});

module.exports = router;
