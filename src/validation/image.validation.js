const { check } = require('express-validator');

module.exports = {
  imageUploadSchema: [
    check('description')
      .trim()
      .isString()
      .isLength({ max: 200 })
      .withMessage('Description must not be more than 200 characters'),

    check('tags')
      .not()
      .isEmpty()
      .withMessage('Pictures must have tags')
      .isArray({ min: 1 })
      .withMessage('Tags should be an array'),

    check('tags.*')
      .isString()
      .withMessage('Expected tags to be an array of strings'),
  ],

  deleteImageSchema: [
    check('photos')
      .not()
      .isEmpty()
      .withMessage('Photos field is required')
      .isArray({ min: 1 })
      .withMessage('Photos field be an array'),

    check('photos.*').isUUID('4').withMessage('Photo ID should be UUIDV4'),
  ],
};
