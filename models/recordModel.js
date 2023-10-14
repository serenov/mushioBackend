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
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  audioFileUrl: {
    type: String,
  },
  userId: {
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
