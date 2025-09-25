const Constraint = require('../models/Constraint');

exports.listConstraints = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const constraints = await Constraint.find();
  res.render('constraints', { constraints });
};

exports.createConstraint = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { type, details, day, startTime, endTime } = req.body;
  await Constraint.create({ type, details, day, startTime, endTime });
  res.redirect('/constraints');
};

exports.deleteConstraint = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { id } = req.body;
  await Constraint.findByIdAndDelete(id);
  res.redirect('/constraints');
};
