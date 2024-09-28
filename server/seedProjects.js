// server/seedProjects.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGODB_URI;

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website to showcase my projects, skills, and experience. Built with React, TailwindCSS, and Node.js.',
    status: 'To-Do',
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, and order tracking. Built with the MERN stack (MongoDB, Express, React, Node.js).',
    status: 'To-Do',
  },
  // ... Add more projects as needed
];

console.log('Connecting to MongoDB...');

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Remove existing projects to avoid duplicates
    await Project.deleteMany({});
    console.log('Existing projects removed.');

    // Insert sample projects
    const insertedProjects = await Project.insertMany(projects);
    console.log('Sample projects inserted:', insertedProjects);

    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
