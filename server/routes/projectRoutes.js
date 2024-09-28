// server/routes/projectRoutes.js
const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Update project status
// Update project status route
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const project = await Project.findById(id);
  
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
  


router.get('/', async (req, res) => {
    try {
      const projects = await Project.find(); // Fetch all projects
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });



  router.post('/', async (req, res) => {
    const { title, description, status, auth_id } = req.body;
    try {
      const newProject = new Project({
        title,
        description,
        status,
        auth_id, // Add the auth_id (if required)
      });
      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
    } catch (err) {
      console.error('Error creating project:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;
