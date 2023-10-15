const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const handleFileUpload = require('../middlewares/uploadMiddleware');


router.get('/records', userController.getAllRecords);


router.get('/records_by_date', userController.getRecordsByDate);

router.post('/record', handleFileUpload, userController.addRecord);

router.delete('/record', userController.deleteRecord)

module.exports = router;
