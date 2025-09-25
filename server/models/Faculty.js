const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  semestersTaught: [{
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    semester: { type: Number }
  }],
  department: { type: String },
  maxLoadPerWeek: { type: Number },
  averageLeavesPerMonth: { type: Number, default: 0 }
});

module.exports = mongoose.model('Faculty', facultySchema);
