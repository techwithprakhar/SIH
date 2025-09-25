const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.get('/', subjectController.listSubjects);
router.post('/', subjectController.createSubject);
router.post('/delete', subjectController.deleteSubject);

module.exports = router;
