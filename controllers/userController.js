const Record = require('../models/recordModel');


exports.getAllRecords = async (req, res) => {
  try {

    const records = await Record.find({ userId: req.userDetails.user_id });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



exports.getRecordsByDate = async (req, res) => {
  try {
    const day = req.query.d;
    const month = req.query.m;
    const year = req.query.y;


    if (!day || !month || !year) {
      return res.status(400).json({ message: 'Invalid date parameters.' });
    }


    const date = new Date(`${year}-${month}-${day}`);


    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date.' });
    }


    const records = await Record.find({ userId: req.user.id, recordDate: date });

    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



exports.addRecord = async (req, res) => {
  try {
    const { title, description, emoji_id } = req.body;
    const userId = req.userId;
    const uploadedFiles = req.uploadedFiles;

    if (!title) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    const urls = {
      videoUrl: null,
      audioUrl: null,
      imageUrl: null,
    };

    uploadedFiles.forEach(filename => {
      const fileExtension = filename.split('.').pop();

      if (fileExtension === '.mp4') {
        urls.videoUrl = filename;
      }
      else if (fileExtension === '.mp3') {
        urls.audioUrl = filename;
      }
      else {
        urls.imageUrl = filename;
      }
    })

    const newRecord = new Record({
      userId,
      title,
      emoji_id,
      description,
      ...urls
    });


    const savedRecord = await newRecord.save();

    res.json({ message: 'Record created successfully', data: savedRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error creating the record' });
  }
};
