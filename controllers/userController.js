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
