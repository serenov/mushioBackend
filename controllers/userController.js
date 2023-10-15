const Record = require('../models/recordModel');
const { unlinkSync } = require("fs");


exports.getAllRecords = async (req, res) => {
  try {

    const records = await Record.find({ user_id: req.userDetails.user_id });

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

    console.log(req.userDetails)
    const newRecord = new Record({
      user_id: req.userDetails.user_id,
      ...req.body
    });

    const savedRecord = await newRecord.save();

    res.json({ message: 'Record created successfully', data: savedRecord });
  } catch (error) {
    res.status(500).json({ message: `Error creating the record. ${error}`});
  }
};

const deleteFiles = (record) => {
  try {
    if (record.imageUrl) {
      unlinkSync(path.join(__dirname, '..', imageUrl));
    }
    
    if (record.videoUrl) {
      unlinkSync(path.join(__dirname, '..', videoUrl));
    }

    if (record.audioUrl) {
      unlinkSync(path.join(__dirname, '..', audioUrl));
    }
  }
  catch (err) {
    throw err;
  }
}

exports.deleteRecord = async (req, res) => {

  try {
    
    if (req.query.record_id === 'all') {
      const records = await Record.findAll({});
      records.forEach(record => deleteFiles(record))
    }
    else {
      const record = await Record.findOne({ _id: req.query.record_id });
      deleteFiles(record);
    }
    res.status(200).json({ message: 'Successfully deleted.' })
  }
  catch (err) {
    res.status(500).json({ message: 'Internal server error.'})
  }


}
