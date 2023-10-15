const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const handleFileUpload = (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;

  
  form.uploadDir = path.join(__dirname, 'uploads');
  form.keepExtensions = true;

  const uploadedFiles = [];

  
  form.maxFileSize = 10 * 1024 * 1024; 

  form.onPart = function (part) 
  {
    if (part.filename) 
    {
      
      const validExtensions = ['.mp4', '.mp3', '.jpg'];
      const ext = path.extname(part.filename).toLowerCase();
      if (!validExtensions.includes(ext)) {
        return next(new Error('Invalid file extension. Only .mp4, .mp3, .jpg allowed'));
      }

      
      if (part.byteCount > form.maxFileSize) {
        return next(new Error('File size exceeds the limit.'));
      }

      
      const fileUuid = uuidv4();

      
      const fileUrl = `/uploads/${ext === 'mp4' ? 'videos' : (ext === '.jpg' ? 'images' : 'audio')}/${fileUuid}${ext}`;
      const finalFilePath = path.join(form.uploadDir, ext === '.mp4' ? 'videos' : (ext === '.jpg' ? 'images' : 'audio'), `${fileUuid}${ext}`);

      
      fs.rename(part, finalFilePath, (err) => {
        if (err) {
          return next(err);
        }

        
        uploadedFiles.push(fileUrl);
      });
    }
  };

  form.on('end', function () {
   
    req.uploadedFiles = uploadedFiles;
    next();
  });

  form.parse(req);
};

module.exports = handleFileUpload;
