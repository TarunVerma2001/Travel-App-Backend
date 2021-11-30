const Review = require('../models/reviewModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllReviews = async (req, res, next) => {
  console.log('inside reviews');
  try {
    let filter = {};

    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Review.find(filter), req.query)
      .filter()
      .sort()
      .paginate()
      .limitFields();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.setTourUserId = async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = async (req, res, next) => {
  try {
    const doc = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (err) {
    next(err);
  }
};
