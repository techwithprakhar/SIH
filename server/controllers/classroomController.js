const Classroom = require('../models/Classroom');

exports.listClassrooms = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const classrooms = await Classroom.find();
  res.render('classrooms', { classrooms });
};

exports.createClassroom = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { name, capacity, type, department, shift } = req.body;
  await Classroom.create({ name, capacity, type, department, shift });
  res.redirect('/classrooms');
};

exports.deleteClassroom = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { id } = req.body;
  await Classroom.findByIdAndDelete(id);
  res.redirect('/classrooms');
};
