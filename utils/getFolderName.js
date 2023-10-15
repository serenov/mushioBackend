 const getFolderName = function (extension) {
    switch (extension.toLowerCase()) {
      case '.png':
      case '.jpg':
      case '.jpeg':
      case '.gif':
        return 'images';
      case '.mp4':
        return 'videos';
      case '.mp3':
        return 'audios';
      default:
        return 'other';
    }
  }
module.exports = getFolderName;