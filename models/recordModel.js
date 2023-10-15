const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  emoji_id: {
    type: Number,
    require: true
  },
  description: {
    type: String,
  },
  hashtags: {
    type: [String]
  },
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  recordDate: {
    type: Date,
    default: Date.now,
  },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
