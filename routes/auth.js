const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.use(express.json());

router.post('/register', authController.register);

router.post('/login', authController.login);

// otpModelrouter.post('/verify_otp', authController.verifyOTP);

module.exports = router;
