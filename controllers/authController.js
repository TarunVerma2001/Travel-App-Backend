const User = require('../models/userModel');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
      role: req.body.role,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //ckeck if email and password exist

    if (!email || !password) {
      return next(new AppError('Please provide an email and password!', 400));
    }

    //check if user exist and password is correct

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('incorrect email or password!', 401));
    }

    // if everything is right the sends the token

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    //1) get the token from the user as bearer token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('You are not logged in Please logIn to get access!', 401)
      );
    }

    //2) verify the token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3) check if user exists

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exist!', 401)
      );
    }

    //4) check if user changed password after the token is issued

    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password please login again!', 401)
      );
    }

    //GRANT ACCESS

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles === ['admin', 'user']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'you do not have a permission to perform this action!',
          403
        )
      );
    }

    next();
  };
};

exports.updatePassword = async (req, res, next) => {
  try {
    //get user password from the collection
    const user = await User.findById(req.user.id).select('+password');

    //check if the entered passwod is correct or nostrud
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('your current password is wrong. ', 401));
    }

    //update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

//TODO update and reset password yet to be implemented
