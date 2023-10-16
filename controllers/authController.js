const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModel'); 
const OtpModel = require('../models/otpModel');

const registerSchema = require('../joi/registerSchema');
const loginSchema = require('../joi/loginSchema')
const validateSchema = require('../utils/validateSchema');
const sendVerificationEmail = require('../utils/mailer');
const randomstring = require('randomstring')

exports.login = async (req, res) => {
  try {
    const error = validateSchema(req.body, loginSchema)
    if(error) {
      return res.status(400).json({ message: error })
    }

    
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }
    
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }
    
    
    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '3d',
    });
    
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again later.', error: err});
  }
};

exports.register = async (req, res) => {
  
  try {
    
    const error = validateSchema(req.body, registerSchema);

    if(error) {
      return res.status(400).json({ message: error });
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const otp = randomstring.generate(6);

    await sendVerificationEmail(email, otp);
    
    res.status(200).json({ message: 'OTP sent for verification.' });
    
    const unVerifiedUser = new OtpModel({
      email,
      passwordHash: hashedPassword,
      otp,
      expirationTime: new Date(Date.now() + 10 * 60 * 1000), 
    });
    
    await unVerifiedUser.save();
    
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again later.', error: err });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await OtpModel.findOne({ email });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid email address.' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }
   
    if (new Date() > otpRecord.expirationTime) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    await OtpModel.deleteOne({ email });

    const newUser = new User({
      email: otpRecord.email,
      passwordHash: otpRecord.passwordHash,
    })


    res.status(201).json({ message: 'OTP verification successful, User created.' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'OTP verification failed.' });
  }
};



