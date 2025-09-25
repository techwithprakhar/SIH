const express = require('express');
const router = express.Router();
const constraintController = require('../controllers/constraintController');

router.get('/', constraintController.listConstraints);
router.post('/', constraintController.createConstraint);
router.post('/delete', constraintController.deleteConstraint);

module.exports = router;
