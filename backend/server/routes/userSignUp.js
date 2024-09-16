const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { newUserValidation } = require('../models/userValidator');
const User = require('../models/userModel');

router.post('/signup', async (req, res) => {
    console.log('Sign-Up Request Body:', req.body);

    const { error } = newUserValidation(req.body);
    if (error) {
        console.log('Validation Error:', error.errors);
        return res.status(400).json({ message: error.errors[0].message });
    }

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            const message = existingUser.username === username
                ? "Username is taken, pick another"
                : "Email is already registered";
            return res.status(409).json({ message });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Hashed Password:', hashedPassword);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log('Saved User:', savedUser);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                username: savedUser.username,
                email: savedUser.email,
                date: savedUser.date,
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: "Error trying to create new user" });
    }
});

module.exports = router;
