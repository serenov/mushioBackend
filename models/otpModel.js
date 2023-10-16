const mongoose = require('mongoose');

const otpVerificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Date,
    required: true,
  },
});

const OTPVerification = mongoose.model('OTPVerification', otpVerificationSchema);

module.exports = OTPVerification;
