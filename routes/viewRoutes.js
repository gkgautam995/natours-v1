const express = require('express');

const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);

router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewController.getSignupForm);
router.get('/bookmarkTours', authController.protect, viewController.markTours);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/me-tours', authController.protect, viewController.getMyTours);
router.get(
  '/tours/:tourId/reviews',
  authController.protect,
  viewController.getReviewForm
);
router.get('/me-reviews', authController.protect, viewController.getMyReviews);

module.exports = router;
