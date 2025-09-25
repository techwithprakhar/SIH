const mongoose = require("mongoose")

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  weeklyClassesRequired: {
    type: Number,
    required: true,
  },
  facultyAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
    },
  ],
})

module.exports = mongoose.model("Subject", SubjectSchema)
