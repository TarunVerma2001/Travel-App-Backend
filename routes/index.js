const express = require('express');
const router = express.Router();

//Routes
app.use('/api/v1/users', require('./userRoutes'));
app.use('/api/v1/tours', require('./tourRoutes'));
app.use('/api/v1/reviews', require('./reviewRoutes'));
app.use('/api/v1/razorpay', require('./razorpayRoutes'));

module.exports = router;
