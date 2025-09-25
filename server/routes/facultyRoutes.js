const express = require("express")
const { protect, authorize } = require("../middleware/authMiddleware")
const { getFacultyTimetable, submitLeaveRequest } = require("../controllers/facultyController")

const router = express.Router()

// Protect all faculty routes
router.use(protect)
router.use(authorize("faculty"))

router.get("/timetable", getFacultyTimetable)
router.post("/leave", submitLeaveRequest)

module.exports = router
