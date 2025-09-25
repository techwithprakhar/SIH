const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String },
  semester: { type: Number },
  studentsCount: { type: Number },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  shift: { type: String },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }],
  subjectTeacherAssignments: [{ subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }, teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' } }]
});

module.exports = mongoose.model('Batch', batchSchema);
