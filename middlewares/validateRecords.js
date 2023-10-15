const validateSchema = require('../utils/validateSchema');
const recordSchema = require('../joi/recordSchema')
const validateRecords = (req, res, next) => {
    try {
        const error = validateSchema(req.body, recordSchema);
        if (error) {
            res.status(400).json({ message: error })
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = validateRecords