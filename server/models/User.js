const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "faculty", "student"],
    required: true,
  },
})

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
  next()
})

// Compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash)
}

module.exports = mongoose.model("User", UserSchema)
