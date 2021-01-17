const cloudinary = require('cloudinary');
const winston = require('../config/logger');

module.exports = async function deleteImage(imgURL) {
  const imgArr = imgURL.split('/');
  const folderName = imgArr[imgArr.length - 2];
  const fileName = imgArr[imgArr.length - 1];
  const publicID = fileName.substr(0, fileName.length - 5);
  const filePath = `${folderName}/${publicID}`;

  return cloudinary.v2.uploader.destroy(filePath, (err, result) => {
    if (!result) {
      winston.error(
        `failed to delete cloudinary image - ${err.result} - file path: ${filePath}`,
      );
    } else {
      winston.info(
        `Deleted cloudinary image - ${result.result} - file path: ${filePath}`,
      );
    }
  });
};
