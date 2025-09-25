const Student = require("../models/Student")
const Timetable = require("../models/Timetable")

// @desc    View student's batch timetable
// @route   GET /api/student/timetable
// @access  Private (Student)
exports.getStudentTimetable = async (req, res) => {
  const { weekStartDate } = req.query // Optional: YYYY-MM-DD

  try {
    const student = await Student.findOne({ userId: req.user._id })
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" })
    }

    const query = {
      "slots.batchId": student.batchId,
      status: "approved",
    }
    if (weekStartDate) {
      query.weekStartDate = new Date(weekStartDate)
    } else {
      const today = new Date()
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))) // Monday
      startOfWeek.setHours(0, 0, 0, 0)
      query.weekStartDate = startOfWeek
    }

    const timetable = await Timetable.findOne(query)
      .populate({
        path: "slots.subjectId",
        select: "name",
      })
      .populate({
        path: "slots.facultyId",
        select: "name",
      })
      .populate({
        path: "slots.classroomId",
        select: "roomNumber",
      })
      .populate({
        path: "slots.batchId",
        select: "name",
      })

    if (!timetable) {
      return res.status(404).json({ message: "Approved timetable not found for your batch." })
    }

    res.status(200).json(timetable)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
