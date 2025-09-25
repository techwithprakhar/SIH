const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

router.get('/', classroomController.listClassrooms);
router.post('/', classroomController.createClassroom);
router.post('/delete', classroomController.deleteClassroom);

module.exports = router;
