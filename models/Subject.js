const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  department: { type: String },
  semester: { type: Number },
  isElective: { type: Boolean, default: false },
  requiredClassesPerWeek: { type: Number, required: true },
  maxClassesPerDay: { type: Number, default: 2 }
});

module.exports = mongoose.model('Subject', subjectSchema);
