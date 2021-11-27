const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

//TODO update and resetPassword routes yet to implemted

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .delete(authController.protect, tourController.deleteTour);

module.exports = router;
