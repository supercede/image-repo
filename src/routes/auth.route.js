const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const catchAsync = require('../helpers/catchAsync');
const authentication = require('../middleware/authentication');
const authValidation = require('../validation/auth.validation');
const validator = require('../middleware/validator');

const { authenticate } = authentication;
const {
  userLogInSchema,
  userSignUpSchema,
  changePasswordSchema,
} = authValidation;

const { signup, login, changePassword, logout } = authController;

const authRouter = Router();

authRouter.post('/signup', validator(userSignUpSchema), catchAsync(signup));
authRouter.post('/login', validator(userLogInSchema), catchAsync(login));
authRouter.post('/logout', catchAsync(logout));

module.exports = authRouter;
