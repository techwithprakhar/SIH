const Batch = require('../models/Batch');
const Classroom = require('../models/Classroom');
const Faculty = require('../models/Faculty');
const Subject = require('../models/Subject');

exports.listBatches = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const batches = await Batch.find().populate('subjects classroom teachers');
  const classrooms = await Classroom.find();
  const faculty = await Faculty.find();
  const subjects = await Subject.find();
  res.render('batches', { batches, classrooms, faculty, subjects });
};

exports.createBatch = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { name, department, semester, studentsCount, shift, classroom, teachers, subjects } = req.body;
  let teachersArr = teachers;
  if (!Array.isArray(teachersArr)) teachersArr = teachersArr ? [teachersArr] : [];
  let subjectsArr = subjects;
  if (!Array.isArray(subjectsArr)) subjectsArr = subjectsArr ? [subjectsArr] : [];
  let subjectTeacherAssignments = [];
  subjectsArr.forEach(subId => {
    const teacherId = req.body['teacherFor_' + subId];
    if (teacherId) {
      subjectTeacherAssignments.push({ subject: subId, teacher: teacherId });
    }
  });
  await Batch.create({ name, department, semester, studentsCount, shift, classroom, teachers: teachersArr, subjects: subjectsArr, subjectTeacherAssignments });
  res.redirect('/batches');
};

exports.deleteBatch = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { id } = req.body;
  await Batch.findByIdAndDelete(id);
  res.redirect('/batches');
};
