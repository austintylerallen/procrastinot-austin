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
  time_applied: {
    type: Number,
    default: 0,
  },
  auth_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'working', 'completed'],
    default: 'todo',
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
