const formidable = require('formidable');
const { renameSync } = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const getFolderName = require('../utils/getFolderName');
const parseRecordFields = require('../utils/parseRecordFields');
const recordSchema = require('../joi/recordSchema');

const validateSchema = require('../utils/validateSchema');


const handleFileUpload = (req, res, next) => {

  const form = new formidable.IncomingForm();
  const maxFileSize = 10 * 1024 * 1024; 
  
  form.multipart = true;
  
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }
    
    
    const body = parseRecordFields(fields);

    const error = validateSchema(body, recordSchema);

    if(error) {
      res.status(400).json({ message: error });
    }

    
    const uploadedFiles = files; 
    console.log(files);
    
    
    
    console.log('Title:', body.title);
    console.log('Description:', body.description);
    
    if (uploadedFiles) {
      
      const validExtensions = ['.mp4', '.mp3', '.jpg', '.png'];

      Object.keys(uploadedFiles).forEach((key) => {

        const file = uploadedFiles[key][0];
        const ext = '.' + file.originalFilename.split('.').pop();


        if (!validExtensions.includes(ext)) {
          return next(new Error('Invalid file extension. Only .mp4, .mp3, .jpg allowed'));
        }

        if (file.size > maxFileSize) {
          return next(new Error('File size exceeds the limit'));
        }
      });

      Object.keys(uploadedFiles).forEach((key) => {

        const file = uploadedFiles[key][0];
        const ext = '.' + file.originalFilename.split('.').pop();
        
        const fileUuid = uuidv4();
        const fileUrl = `/uploads/${getFolderName(ext)}/${fileUuid}${ext}`;
        try {
          renameSync(file.filepath, path.join(__dirname, "..", fileUrl))
          if (key === 'image') {
            body.imageUrl = fileUrl;
          }
          else if (key === 'audio') {
            body.audioUrl = fileUrl;
          }
          else if (key === 'video') {
            body.videoUrl = fileUrl;
          }
        }
        catch (err) {
          return next(`File upload failed ${ file.originalFilename } ${ err }`);
        }
        
      });

    }

    req.body = body;

    next();
  });


  form.parse(req);
};

module.exports = handleFileUpload;
