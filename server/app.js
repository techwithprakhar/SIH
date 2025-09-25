const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const app = express();

// Body parsing middleware (must be before all routes)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register routes
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password, name, email, role } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.render('register', { error: 'Username already exists.' });
    }
    const user = new User({ username, password, name, email, role });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (err) {
    res.render('register', { error: 'Registration failed. Please try again.' });
  }
});
// Assign subjects to batch routes
app.get('/batch-subjects', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const batches = await Batch.find();
  const subjects = await Subject.find();
  res.render('batch-subjects', { batches, subjects });
});
app.post('/batch-subjects', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const batchId = req.body.batch;
  let subjects = req.body.subjects;
  if (!Array.isArray(subjects)) subjects = [subjects];
  await Batch.findByIdAndUpdate(batchId, { $set: { subjects } });
  res.redirect('/batches');
});
// Models (for batch-subjects only)
const Constraint = require('./models/Constraint');
const Batch = require('./models/Batch');
const Subject = require('./models/Subject');
const Classroom = require('./models/Classroom');
const Faculty = require('./models/Faculty');
const User = require('./models/User');



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware (move above all routes)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Routers
const classroomRoutes = require('./routes/classroomRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const batchRoutes = require('./routes/batchRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const constraintRoutes = require('./routes/constraintRoutes');
const specialClassRoutes = require('./routes/specialClassRoutes');

app.use('/classrooms', classroomRoutes);
app.use('/subjects', subjectRoutes);
app.use('/faculty', facultyRoutes);
app.use('/batches', batchRoutes);
app.use('/timetable', timetableRoutes);
app.use('/constraints', constraintRoutes);
app.use('/special-classes', specialClassRoutes);

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Login routes
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render('login', { error: 'Invalid username or password.' });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.render('login', { error: 'Invalid username or password.' });
  }
  req.session.userId = user._id;
  res.redirect('/dashboard');
});

// Dashboard route
app.get('/dashboard', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const user = await User.findById(req.session.userId);
  res.render('dashboard', { user });
});

// Timetable view route
app.get('/timetable', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const batches = await Batch.find().populate('classroom teachers');
  res.render('timetable', { timetable: null, batches });
});

app.post('/timetable', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const batchId = req.body.batchId;
  const batch = await Batch.findById(batchId).populate('classroom teachers subjects');
  // Pass batch info to timetable generator
  const reqMock = { body: { batchId, batch } };
  const resMock = {
    json: (data) => {
      const batchesPromise = Batch.find().populate('classroom teachers');
      batchesPromise.then(batches => {
        res.render('timetable', { timetable: data.timetable, batches, selectedBatch: batch });
      });
    },
    status: () => ({ json: () => Batch.find().populate('classroom teachers').then(batches => res.render('timetable', { timetable: [], batches })) })
  };
  await generateTimetable(reqMock, resMock);
});

// Timetable review route (placeholder)
app.post('/timetable/review', (req, res) => {
  // TODO: Implement review/approval workflow
  res.send('Timetable submitted for review.');
});

// Timetable API
// Remove direct timetable API route; handled by timetableRoutes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const SpecialClass = require('./models/SpecialClass');
// Special Classes route
app.post('/special-classes/delete', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { id } = req.body;
  await SpecialClass.findByIdAndDelete(id);
  res.redirect('/special-classes');
});
app.get('/special-classes', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const classes = await SpecialClass.find().populate('subject faculty batch classroom');
  // Format for EJS view
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
});

// Delete faculty route
app.post('/faculty/delete', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  const { id } = req.body;
  await Faculty.findByIdAndDelete(id);
  res.redirect('/faculty');
});