const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/scheduleController');

router.get('/', timetableController.timetablePage);
router.post('/', timetableController.generateTimetable);
router.post('/all', (req, res, next) => {
	req.body.allBatches = 'true';
	timetableController.generateTimetable(req, res, next);
});
router.post('/review', timetableController.reviewTimetable);

module.exports = router;
