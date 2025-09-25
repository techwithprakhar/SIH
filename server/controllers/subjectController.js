const Subject = require('../models/Subject');

exports.listSubjects = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const subjects = await Subject.find();
  res.render('subjects', { subjects });
};

exports.createSubject = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { name, code, department, semester, isElective, requiredClassesPerWeek, maxClassesPerDay } = req.body;
  await Subject.create({
    name,
    code,
    department,
    semester,
    isElective: !!isElective,
    requiredClassesPerWeek,
    maxClassesPerDay
  });
  res.redirect('/subjects');
};

exports.deleteSubject = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { id } = req.body;
  await Subject.findByIdAndDelete(id);
  res.redirect('/subjects');
};
