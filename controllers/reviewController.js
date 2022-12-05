const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

// Set Tour and User ID's
exports.setTourUserId = (req, res, next) => {
  // Nested routes for Reviews
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Get All Reviews
exports.getAllReviews = factory.getAll(Review);
// Get Review information by review id
exports.getReview = factory.getOne(Review);
// Create new Review information
exports.createReview = factory.createOne(Review);
// Update Review information
exports.updateReview = factory.updateOne(Review);
// Delete Review information
exports.deleteReview = factory.deleteOne(Review);
