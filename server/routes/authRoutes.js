const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register Route
// Registration Route in authRoutes.js

// Backend (Node.js/Express) registration route example
router.post('/register', async (req, res) => {
  try {
    // Validate user input (e.g., check if email already exists, password validation)
    const { email, username, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Create the user in the database
    const newUser = new User({ email, username, password });
    await newUser.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and user details to the client
    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Server error during registration:', error);
    res.status(500).json({ message: 'Registration failed. Server error.' });
  }
});
  

// Login Route
// authRoutes.js

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Attempting login with:', { email, password });
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      console.log('User found:', user);
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match result:', isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Token generated:', token);
  
      // Send token and user info in response
      res.json({
        data: { // Wrap in a data object
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email
          }
        }
      });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).send('Server error');
    }
  });
  
  

// Token Verification Route
router.get('/verify-token', (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router;
