const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User'); 

// POST /api/v1/user/signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input 
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'User already exists!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
        username,
        email,
        password: hashedPassword, // Store the hashed password
    });

    await newUser.save(); // Save the user to MongoDB
    res.status(201).json({ message: 'User created successfully.', user_id: newUser._id });
});

// POST /api/v1/user/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password.' });
    }

    res.status(200).json({ message: 'Login successful!', user_id: user.email });
});

module.exports = router;
