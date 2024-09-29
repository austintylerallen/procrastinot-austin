const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection using environment variables
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit process if connection fails
  });

// Sample projects to seed
const projects = [
  {
    title: 'Build a Personal Portfolio Website',
    description: 'Create a responsive and attractive personal portfolio website using React and Tailwind CSS.',
    status: 'To-Do',
    auth_id: null, // Default value for seeding
  },
  {
    title: 'Develop a Task Management System',
    description: 'Implement a task management system with features like to-do, in-progress, and completed tasks.',
    status: 'To-Do',
    auth_id: null, // Default value for seeding
  },
  {
    title: 'Create a Blogging Platform',
    description: 'Develop a full-featured blogging platform with user authentication, rich text editor, and comment section.',
    status: 'To-Do',
    auth_id: null, // Default value for seeding
  },
  {
    title: 'Real-Time Chat Application',
    description: 'Build a real-time chat application using React, Node.js, Socket.io, and MongoDB.',
    status: 'Working',
    auth_id: null, // Default value for seeding
  },
  {
    title: 'E-commerce Website with Payment Gateway',
    description: 'Create an e-commerce website with a shopping cart, product management, and integration with Stripe for payments.',
    status: 'Completed',
    auth_id: null, // Default value for seeding
  },
];

// Function to seed projects
const seedProjects = async () => {
  try {
    await Project.deleteMany(); // Clear existing data
    await Project.insertMany(projects); // Insert sample projects
    console.log('Sample projects have been added to the database!');
  } catch (error) {
    console.error('Error seeding projects:', error);
  } finally {
    mongoose.connection.close(); // Ensure connection is closed in all scenarios
  }
};

// Call the seed function
seedProjects();
