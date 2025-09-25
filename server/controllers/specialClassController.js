const SpecialClass = require('../models/SpecialClass');

exports.listSpecialClasses = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const classes = await SpecialClass.find().populate('subject faculty batch classroom');
  const specialClasses = classes.map(cls => ({
    name: cls.name,
    subject: cls.subject?.name || '',
    faculty: cls.faculty?.name || '',
    batch: cls.batch?.name || '',
    classroom: cls.classroom?.name || '',
    day: cls.day,
    startTime: cls.startTime,
    endTime: cls.endTime
  }));
  res.render('special-classes', { specialClasses });
};

exports.createSpecialClass = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  // TODO: Add creation logic
  res.redirect('/special-classes');
};

exports.deleteSpecialClass = async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { id } = req.body;
  await SpecialClass.findByIdAndDelete(id);
  res.redirect('/special-classes');
};
