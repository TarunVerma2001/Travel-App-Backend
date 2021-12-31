const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const AppError = require('./../utils/appError');

exports.getCheckoutSession = async (req, res, next) => {
  try {
    //get the currently booked tour session
    const tour = await Tour.findById(req.params.tourId);
    //create the checkout session

    stripe.checkout.session.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://{req.get('host)}/`,
      cancel_url: `${req.protocol}://{req.get('host)}/tour/${tour.slug}`,
      customer_email: req.user.email,
    });
    //create session as response
  } catch (err) {
    next(err);
  }
};
