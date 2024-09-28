// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Create a new project
router.post('/todo', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      auth_id: req.user._id, // assuming you have user auth in place
      status: 'todo',
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

// Get all projects
router.get('/:status(todo|working|completed)', async (req, res) => {
  try {
    const projects = await Project.find({ status: req.params.status }).sort({ order: 'asc' });
    res.json(projects);
  } catch (err) {
    console.error(`Failed to load projects: ${err}`);
    res.status(500).json({ message: 'Failed to load projects' });
  }
});

// Move project to another status
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.status = req.body.status || project.status;
    project.order = req.body.order !== undefined ? req.body.order : project.order;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    console.error(`Failed to update project: ${err}`);
    res.status(500).json({ message: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (err) {
    console.error(`Failed to delete project: ${err}`);
    res.status(500).json({ message: 'Failed to delete project' });
  }
});

module.exports = router;
