const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  type: { type: String, enum: ['classroom', 'laboratory'], default: 'classroom' },
  department: { type: String },
  shift: { type: String }
});

module.exports = mongoose.model('Classroom', classroomSchema);
