const express = require("express")
const { protect, authorize } = require("../middleware/authMiddleware")
const { getStudentTimetable } = require("../controllers/studentController")

const router = express.Router()

// Protect all student routes
router.use(protect)
router.use(authorize("student"))

router.get("/timetable", getStudentTimetable)

module.exports = router
