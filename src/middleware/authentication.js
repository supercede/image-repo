/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require('../helpers/catchAsync');
const models = require('../models');
const { ApplicationError } = require('../helpers/errors');
const { getAsync } = require('../helpers/redis');

const { user } = models;

module.exports = {
  authenticate: catchAsync(async (req, res, next) => {
    let token;
    //  Check if token is in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.imgRepo292) {
      // else check if it is in a cookie
      token = req.cookies.imgRepo292;
    }

    if (!token) {
      return next(
        new ApplicationError(401, 'You need to login to access this resource'),
      );
    }

    // Verify Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user exists
    const currentUser = await user.findByPk(decoded.id);
    if (!currentUser) {
      return next(new ApplicationError(401, 'Invalid Token'));
    }

    // check if token exists in redis store
    const result = await getAsync(currentUser.id);
    if (!result || result !== token) {
      return next(new ApplicationError(401, 'Invalid Token'));
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }),
};
