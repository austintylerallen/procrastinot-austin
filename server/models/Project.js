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
  userId: { // Renamed from auth_id to userId for clarity
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Make it required
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
