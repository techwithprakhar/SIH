const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

const authRoutes = require("./routes/authRoutes")
const adminRoutes = require("./routes/adminRoutes") // Import admin routes
const facultyRoutes = require("./routes/facultyRoutes") // Import faculty routes
const studentRoutes = require("./routes/studentRoutes") // Import student routes

app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes) // Use admin routes
app.use("/api/faculty", facultyRoutes) // Use faculty routes
app.use("/api/student", studentRoutes) // Use student routes

// Basic route
app.get("/", (req, res) => {
  res.send("Timetable Backend API is running")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
