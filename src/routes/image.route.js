const { Router } = require('express');
const upload = require('../helpers/imageUpload');
const { authenticate } = require('../middleware/authentication');
const authController = require('../controllers/auth.controller');
const catchAsync = require('../helpers/catchAsync');
const authentication = require('../middleware/authentication');
const validator = require('../middleware/validator');
const imageController = require('../controllers/image.controller');
const imageValidation = require('../validation/image.validation');

const {
  uploadImage,
  getImages,
  getUserImages,
  deleteAllUserImages,
  deleteImages,
} = imageController;
const { imageUploadSchema, deleteImageSchema } = imageValidation;

const imageRouter = Router();

imageRouter
  .route('/')
  .post(
    authenticate,
    upload.array('image', 5),
    validator(imageUploadSchema),
    catchAsync(uploadImage),
  )
  .get(catchAsync(getImages))
  .delete(authenticate, validator(deleteImageSchema), catchAsync(deleteImages));

imageRouter
  .route('/me')
  .get(authenticate, catchAsync(getUserImages))
  .delete(authenticate, catchAsync(deleteAllUserImages));

module.exports = imageRouter;
