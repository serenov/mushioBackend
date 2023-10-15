const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const handleFileUpload = require('../middlewares/uploadMiddleware');


router.get('/getallRecords', userController.getAllRecords);


router.get('/getRecordsByDate', userController.getRecordsByDate);

router.post('/postRecord', handleFileUpload, userController.addRecord);

module.exports = router;
