const validateSchema = require('../utils/validateSchema');
const recordSchema = require('../joi/recordSchema')
const validateRecords = (req, res, next) => {
    try {
        validateSchema(req.body, recordSchema);
        next();
    }
    catch (err) {
        res.status(err.code).json({ message: err.message });
    }
}


module.exports = validateRecords