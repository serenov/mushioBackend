const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
