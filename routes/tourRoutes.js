const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

const express = require('express');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.get(
  '/tours-within/:distance/center/:latlng/unit/:unit',
  tourController.getToursWithin
);

//tours-within?distance233&center=-40,45&unit=mi
//tours-within/233/center/-40,45/unit/mi

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.deleteTour
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.updateTour
  );

module.exports = router;
