const mongoose = require("mongoose")

const BatchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  shift: {
    type: String,
    enum: ["morning", "evening"],
    required: true,
  },
})

module.exports = mongoose.model("Batch", BatchSchema)
