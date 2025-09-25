const Faculty = require('../models/Faculty');
const Subject = require('../models/Subject');

exports.listFaculty = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const faculty = await Faculty.find().populate('subjects semestersTaught.subject');
  const subjects = await Subject.find();
  res.render('faculty', { faculty, subjects });
};

exports.createFaculty = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { name, email, department, maxLoadPerWeek, averageLeavesPerMonth, subjects } = req.body;
  let subjectsArr = subjects;
  if (!Array.isArray(subjectsArr)) subjectsArr = subjectsArr ? [subjectsArr] : [];
  let semestersArr = [];
  subjectsArr.forEach(subId => {
    const semesterVal = req.body['semesterFor_' + subId];
    if (subId && semesterVal && !isNaN(Number(semesterVal))) {
      semestersArr.push({ subject: subId, semester: Number(semesterVal) });
    }
  });
  await Faculty.create({ name, email, department, maxLoadPerWeek, averageLeavesPerMonth, subjects: subjectsArr, semestersTaught: semestersArr });
  res.redirect('/faculty');
};

exports.deleteFaculty = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { id } = req.body;
  await Faculty.findByIdAndDelete(id);
  res.redirect('/faculty');
};
