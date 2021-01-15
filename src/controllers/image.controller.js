const { ApplicationError } = require('../helpers/errors');
const models = require('../models');
const deleteImage = require('../helpers/deleteImage');

const { image, user } = models;

module.exports = {
  /**
   * @function uploadImage
   * @description handles uploading an image
   *
   * @param {Object} request - the request object
   * @param {Object} response - the response object
   *
   * @returns {Object} response - the response object
   */
  uploadImage: async (req, res) => {
    if (req.files) {
      const photos = [];

      Promise.all(
        req.files.map(async file => {
          const { path } = file;
          req.body.imageURL = path;
          const { imageURL, description, tags } = req.body;

          const photo = await req.user.createImage({
            imageURL,
            description,
            tags,
            // user_id: req.user.id,
          });
          photos.push(photo);
        }),
      )
        .then(() => {
          res.status(201).json({
            status: 'success',
            message: 'Photos uploaded successfully',
            data: {
              photos,
            },
          });
        })
        .catch(err => {
          throw new ApplicationError(
            500,
            'Errors uploading one or more images',
          );
        });
    } else {
      throw new ApplicationError(400, 'Please upload an image');
    }
  },
};
