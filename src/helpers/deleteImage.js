const cloudinary = require('cloudinary');
const winston = require('../config/logger');

module.exports = async function deleteImage(imgURL) {
  const imgArr = imgURL.split('/');
  const folderName = imgArr[imgArr.length - 2];
  const fileName = imgArr[imgArr.length - 1];
  const publicID = fileName.substr(0, fileName.length - 4);

  const filePath = `${folderName}/${publicID}`;

  return cloudinary.v2.uploader.destroy(filePath, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};
