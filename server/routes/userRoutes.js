// server/routes/userRoutes.js
const express = require('express');
const User = require('../models/User'); // Import the User model if needed
const router = express.Router();

// Define user-related routes
router.get('/:id', async (req, res) => {
  // Get user by ID
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user by ID (if not already defined)
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router
module.exports = router;
