const express = require('express');
const razorpayController = require('./../controllers/razorpayController');
const router = express.Router();

router.route('/verification').post(razorpayController.verifyPayment);
router.route('/').post(razorpayController.razorpayIntegration);

module.exports = router;
