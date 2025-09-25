const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');

router.get('/', batchController.listBatches);
router.post('/', batchController.createBatch);
router.post('/delete', batchController.deleteBatch);

module.exports = router;
