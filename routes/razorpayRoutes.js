const express = require('express');
const razorpayController = require('./../controllers/razorpayController');
const router = express.Router();

router.route('/').post(razorpayController.razorpayIntegration);

module.exports = router;
