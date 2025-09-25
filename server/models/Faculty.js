const mongoose = require("mongoose")

const FacultySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  availability: [
    {
      day: { type: String, required: true }, // e.g., 'Monday'
      startTime: { type: String, required: true }, // e.g., '09:00'
      endTime: { type: String, required: true }, // e.g., '17:00'
    },
  ],
  leaveHistory: [
    {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      reason: { type: String },
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    },
  ],
})

module.exports = mongoose.model("Faculty", FacultySchema)
