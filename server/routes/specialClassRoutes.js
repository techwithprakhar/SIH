const express = require('express');
const router = express.Router();
const specialClassController = require('../controllers/specialClassController');

router.get('/', specialClassController.listSpecialClasses);
router.post('/', specialClassController.createSpecialClass);
router.post('/delete', specialClassController.deleteSpecialClass);

module.exports = router;
