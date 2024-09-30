const express = require('express');
const Project = require('../models/Project');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// Apply authMiddleware to all project routes
router.use(authMiddleware);

// Update project status route
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const project = await Project.findOne({ _id: id, userId: req.user._id }); // Ensure project belongs to user

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.status = status;
    await project.save();

    res.json(project);
  } catch (err) {
    console.error('Error updating project status:', err.message);
    res.status(500).send('Server error');
  }
});

// Get projects for the logged-in user
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }); // Fetch projects for the logged-in user
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new project for the logged-in user
router.post('/', async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newProject = new Project({
      title,
      description,
      status,
      userId: req.user._id, // Associate with the logged-in user
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
