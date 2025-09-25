const mongoose = require('mongoose');

const specialClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  fixedSlot: { type: Boolean, default: true }
});

module.exports = mongoose.model('SpecialClass', specialClassSchema);
