const User = require("../models/User")
const Faculty = require("../models/Faculty")
const Student = require("../models/Student")
const Batch = require("../models/Batch")
const Classroom = require("../models/Classroom")
const Subject = require("../models/Subject")
const Timetable = require("../models/Timetable")
const { generateTimetableGA } = require("../services/geneticAlgorithmService")

// @desc    Add a new faculty
// @route   POST /api/admin/faculty
// @access  Private (Admin)
exports.addFaculty = async (req, res) => {
  const { name, email, password, subjects, availability } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists" })
    }

    const user = await User.create({
      name,
      email,
      passwordHash: password, // Password will be hashed by pre-save hook
      role: "faculty",
    })

    const faculty = await Faculty.create({
      userId: user._id,
      name,
      subjects,
      availability,
    })

    res.status(201).json({ message: "Faculty added successfully", faculty })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Add a new batch
// @route   POST /api/admin/batch
// @access  Private (Admin)
exports.addBatch = async (req, res) => {
  const { name, department, subjects, shift } = req.body

  try {
    const batchExists = await Batch.findOne({ name })
    if (batchExists) {
      return res.status(400).json({ message: "Batch with this name already exists" })
    }

    const batch = await Batch.create({
      name,
      department,
      subjects,
      shift,
    })

    res.status(201).json({ message: "Batch added successfully", batch })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Add a new classroom
// @route   POST /api/admin/classroom
// @access  Private (Admin)
exports.addClassroom = async (req, res) => {
  const { roomNumber, capacity, availability } = req.body

  try {
    const classroomExists = await Classroom.findOne({ roomNumber })
    if (classroomExists) {
      return res.status(400).json({ message: "Classroom with this room number already exists" })
    }

    const classroom = await Classroom.create({
      roomNumber,
      capacity,
      availability,
    })

    res.status(201).json({ message: "Classroom added successfully", classroom })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Add a new subject & assign faculty
// @route   POST /api/admin/subject
// @access  Private (Admin)
exports.addSubject = async (req, res) => {
  const { name, department, weeklyClassesRequired, facultyAssigned } = req.body

  try {
    const subjectExists = await Subject.findOne({ name, department })
    if (subjectExists) {
      return res.status(400).json({ message: "Subject with this name and department already exists" })
    }

    const subject = await Subject.create({
      name,
      department,
      weeklyClassesRequired,
      facultyAssigned,
    })

    // Update faculty's subjects
    for (const facultyId of facultyAssigned) {
      await Faculty.findByIdAndUpdate(facultyId, { $push: { subjects: subject._id } })
    }

    res.status(201).json({ message: "Subject added successfully", subject })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Trigger GA and return multiple weekly timetable options
// @route   POST /api/admin/timetable/generate
// @access  Private (Admin)
exports.generateTimetable = async (req, res) => {
  const { department, shift } = req.body

  try {
    // Generate a single timetable for now, can be extended to multiple options
    const generatedTimetable = await generateTimetableGA(department, shift)

    if (!generatedTimetable || generatedTimetable.length === 0) {
      return res.status(400).json({ message: "Could not generate a valid timetable." })
    }

    const newTimetable = await Timetable.create({
      weekStartDate: new Date(), // Current week
      department,
      shift,
      slots: generatedTimetable,
      status: "pending",
    })

    res.status(200).json({
      message: "Timetable generation initiated. Check pending timetables.",
      timetableId: newTimetable._id,
      generatedTimetable: newTimetable,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error during timetable generation" })
  }
}

// @desc    View batch-wise timetable
// @route   GET /api/admin/timetable/batch/:batchId
// @access  Private (Admin)
exports.getBatchTimetable = async (req, res) => {
  const { batchId } = req.params
  const { weekStartDate } = req.query // Optional: YYYY-MM-DD

  try {
    const query = {
      "slots.batchId": batchId,
      status: "approved",
    }
    if (weekStartDate) {
      query.weekStartDate = new Date(weekStartDate)
    } else {
      // Get the current week's approved timetable
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
      return res.status(404).json({ message: "Approved timetable not found for this batch." })
    }

    res.status(200).json(timetable)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    View faculty-wise timetable
// @route   GET /api/admin/timetable/faculty/:facultyId
// @access  Private (Admin)
exports.getFacultyTimetable = async (req, res) => {
  const { facultyId } = req.params
  const { weekStartDate } = req.query // Optional: YYYY-MM-DD

  try {
    const query = {
      "slots.facultyId": facultyId,
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
      return res.status(404).json({ message: "Approved timetable not found for this faculty." })
    }

    res.status(200).json(timetable)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Approve a timetable
// @route   POST /api/admin/timetable/approve/:id
// @access  Private (Admin)
exports.approveTimetable = async (req, res) => {
  const { id } = req.params

  try {
    const timetable = await Timetable.findById(id)

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" })
    }

    timetable.status = "approved"
    await timetable.save()

    res.status(200).json({ message: "Timetable approved successfully", timetable })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Reject a timetable
// @route   POST /api/admin/timetable/reject/:id
// @access  Private (Admin)
exports.rejectTimetable = async (req, res) => {
  const { id } = req.params

  try {
    const timetable = await Timetable.findById(id)

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" })
    }

    timetable.status = "rejected"
    await timetable.save()

    res.status(200).json({ message: "Timetable rejected successfully", timetable })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}
