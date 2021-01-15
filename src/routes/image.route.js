const { Router } = require('express');
const upload = require('../helpers/imageUpload');
const { authenticate } = require('../middleware/authentication');
const authController = require('../controllers/auth.controller');
const catchAsync = require('../helpers/catchAsync');
const authentication = require('../middleware/authentication');
const validator = require('../middleware/validator');
const imageController = require('../controllers/image.controller');
const imageValidation = require('../validation/image.validation');

const { uploadImage } = imageController;
const { imageUploadSchema } = imageValidation;

const imageRouter = Router();

imageRouter
  .route('/')
  .post(
    authenticate,
    upload.array('image', 4),
    validator(imageUploadSchema),
    catchAsync(uploadImage),
  );
//   .get(getAllPhotos);

module.exports = imageRouter;
