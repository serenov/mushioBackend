const express = require('express');
const router = express.Router();

const authRoutes = require('./auth'); 
const userRoutes = require('./user');
const verifyToken = require('../middlewares/verifyMiddleware');

router.use('/auth', authRoutes);
router.use('/user', verifyToken, userRoutes)


router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the gateway route!' });
});

module.exports = router;
