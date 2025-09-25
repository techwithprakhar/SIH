const mongoose = require("mongoose")

const ClassroomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  availability: [
    {
      day: { type: String, required: true }, // e.g., 'Monday'
      startTime: { type: String, required: true }, // e.g., '09:00'
      endTime: { type: String, required: true }, // e.g., '17:00'
    },
  ],
})

module.exports = mongoose.model("Classroom", ClassroomSchema)
