const express = require("express")
const { protect, authorize } = require("../middleware/authMiddleware")
const {
  addFaculty,
  addBatch,
  addClassroom,
  addSubject,
  generateTimetable,
  getBatchTimetable,
  getFacultyTimetable,
  approveTimetable,
  rejectTimetable,
} = require("../controllers/adminController")

const router = express.Router()

// Protect all admin routes
router.use(protect)
router.use(authorize("admin"))

router.post("/faculty", addFaculty)
router.post("/batch", addBatch)
router.post("/classroom", addClassroom)
router.post("/subject", addSubject)
router.post("/timetable/generate", generateTimetable)
router.get("/timetable/batch/:batchId", getBatchTimetable)
router.get("/timetable/faculty/:facultyId", getFacultyTimetable)
router.post("/timetable/approve/:id", approveTimetable)
router.post("/timetable/reject/:id", rejectTimetable)

module.exports = router
