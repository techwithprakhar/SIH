const Faculty = require("../models/Faculty")
const Timetable = require("../models/Timetable")

// @desc    View faculty's weekly timetable
// @route   GET /api/faculty/timetable
// @access  Private (Faculty)
exports.getFacultyTimetable = async (req, res) => {
  const { weekStartDate } = req.query // Optional: YYYY-MM-DD

  try {
    const faculty = await Faculty.findOne({ userId: req.user._id })
    if (!faculty) {
      return res.status(404).json({ message: "Faculty profile not found" })
    }

    const query = {
      "slots.facultyId": faculty._id,
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
      return res.status(404).json({ message: "Approved timetable not found for you." })
    }

    res.status(200).json(timetable)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Submit leave request
// @route   POST /api/faculty/leave
// @access  Private (Faculty)
exports.submitLeaveRequest = async (req, res) => {
  const { startDate, endDate, reason } = req.body

  try {
    const faculty = await Faculty.findOne({ userId: req.user._id })
    if (!faculty) {
      return res.status(404).json({ message: "Faculty profile not found" })
    }

    faculty.leaveHistory.push({ startDate, endDate, reason, status: "pending" })
    await faculty.save()

    res
      .status(201)
      .json({ message: "Leave request submitted successfully", leaveRequest: faculty.leaveHistory.slice(-1)[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
