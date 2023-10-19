const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.use(express.json());

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/verify', authController.verifyOTP);

module.exports = router;
