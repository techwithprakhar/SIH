const mongoose = require("mongoose")

const TimetableSlotSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g., 'Monday'
  time: { type: String, required: true }, // e.g., '09:00-10:00'
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
})

const TimetableSchema = new mongoose.Schema({
  weekStartDate: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    enum: ["morning", "evening"],
    required: true,
  },
  slots: [TimetableSlotSchema],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
})

module.exports = mongoose.model("Timetable", TimetableSchema)
