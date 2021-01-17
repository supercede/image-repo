/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

const { ApplicationError, NotFoundError } = require('../helpers/errors');
const models = require('../models');
const deleteImage = require('../helpers/deleteImage');
const publisher = require('../helpers/rabbitmq');

const { image, user, sequelize } = models;

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
  uploadImage: async (request, response) => {
    if (request.files) {
      const photos = [];

      Promise.all(
        request.files.map(async file => {
          const { path } = file;
          request.body.imageURL = path;
          const { imageURL, description, tags, permission } = request.body;

          const photo = await request.user.createImage({
            imageURL,
            description,
            tags,
            permission,
          });
          photos.push(photo);
        }),
      )
        .then(() => {
          response.status(201).json({
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

  getImages: async (request, response) => {
    const photos = await image.findAll({
      where: { permission: 'public' },
    });

    return response.status(200).json({
      status: 'success',
      message: 'Photos fetched successfully',
      data: {
        photos,
      },
    });
  },

  getUserImages: async (request, response) => {
    // const photos = await image.findAll({
    //   where: { userId: request.user.id },
    // });
    const photos = await request.user.getImages();

    return response.status(200).json({
      status: 'success',
      message: 'Photos fetched successfully',
      data: {
        photos,
      },
    });
  },

  deleteImages: async (request, response) => {
    const photosToDelete = request.body.photos;

    // Check images for user access
    await sequelize.transaction(async trx => {
      // photosToDelete.forEach(async photoId => {
      for (const photoId of photosToDelete) {
        const photo = await image.findOne({
          where: {
            id: photoId,
            userId: request.user.id,
          },
        });

        if (photo) {
          await photo
            .destroy({ transaction: trx })
            .then(() => publisher.queue('DELETE_USER_IMAGE', photo.imageURL));
        } else {
          throw new NotFoundError('One or more images not found');
        }
      }
    });

    return response.status(200).json({
      status: 'success',
      message: 'Selected photos deleted successfully',
    });
  },

  deleteAllUserImages: async (request, response) => {
    // await image.destroy({
    //   where: {
    //     userId: request.user.id,
    //   },
    // });
    const images = await request.user.getImages();

    if (images) {
      images.forEach(async img => {
        await img.destroy();
        publisher.queue('DELETE_USER_IMAGE', img.imageURL);
      });
    }

    return response.status(200).json({
      status: 'success',
      message: 'All photos deleted successfully',
    });
  },
};
