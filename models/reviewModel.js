const mongoose = require('mongoose');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review must not be empty!'],
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'A rating msut be greater then or equal to 1!'],
      max: [5, 'A rating msut be less then or equal to 15!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: Tour,
      required: [true, 'Review must belong to a tour!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, 'Review must belong to a user!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
