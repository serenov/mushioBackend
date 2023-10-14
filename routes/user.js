const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const validateRecords = require('../middlewares/validateRecords');
const handleFileUpload = require('../middlewares/uploadMiddleware');


router.get('/getallRecords', userController.getAllRecords);


router.get('/getRecordsByDate', userController.getRecordsByDate);

router.post('/postRecord', validateRecords, handleFileUpload)

module.exports = router;
