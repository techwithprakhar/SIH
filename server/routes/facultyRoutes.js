const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/', facultyController.listFaculty);
router.post('/', facultyController.createFaculty);
router.post('/delete', facultyController.deleteFaculty);

module.exports = router;
