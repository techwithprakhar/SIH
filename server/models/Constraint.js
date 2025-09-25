const mongoose = require('mongoose');

const constraintSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'faculty_unavailable', 'room_unavailable', 'special_class'
  details: { type: mongoose.Schema.Types.Mixed },
  startTime: { type: String },
  endTime: { type: String },
  day: { type: String }
});

module.exports = mongoose.model('Constraint', constraintSchema);
