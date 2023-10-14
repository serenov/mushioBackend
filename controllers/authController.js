const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 
const registerSchema = require('../joi/registerSchema');
const loginSchema = require('../joi/loginSchema')
const validateSchema = require('../utils/validateSchema');

exports.login = async (req, res) => {
  try {
    validateSchema(req.body, loginSchema)
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }
    
    
    const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    
    res.status(200).json({ token });
  } catch (err) {
    if(err.code == 401) res.status(401).json({ message: err.message })
    else res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.register = async (req, res) => {
  
  try {
    
    validateSchema(req.body, registerSchema);

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    
    const newUser = new User({
      email,
      passwordHash: hashedPassword,
    });
    
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    if(err.code == 401) res.status(401).json({ message: err })
    else res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
