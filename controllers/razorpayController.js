const Razorpay = require('razorpay');
const crypto = require('crypto');

exports.razorpayIntegration = async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  try {
    const response = await razorpay.orders.create({
      amount: 49900,
      currency: 'INR',
      receipt: 'testReceipt',
    });
    // console.log('response: ', response);
    res.status(200).json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    console.log('err;:: ', err);
    next(err);
  }
};
