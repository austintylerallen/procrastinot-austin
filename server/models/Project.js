// server/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['To-Do', 'Working', 'Completed'],
    default: 'To-Do',
  },
  auth_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
}, { timestamps: true }); // This will automatically add createdAt and updatedAt fields


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
