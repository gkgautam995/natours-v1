const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// After deployment changes
exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for confirmation. If your booking doesn't show up immediately, please come back later.";

  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. Get tour data from collection
  const tours = await Tour.find();
  let markIds = [];

  if (res.locals.user) {
    markIds = res.locals.user.bookmarkTours;
  }

  // 2. Build template
  // 3. Render that template using tour data form
  res.status(200).render('overview', {
    title: 'Exciting tours for adventurous people',
    tours,
    markIds,
  });
});

exports.markTours = catchAsync(async (req, res, next) => {
  // 1. Get tour data from collection
  const tours = await Tour.find({
    _id: { $in: res.locals.user.bookmarkTours },
  });
  const markIds = res.locals.user.bookmarkTours;
  // 2. Build template
  // 3. Render that template using tour data form
  res.status(200).render('overview', {
    title: 'Bookmarked tours for adventurous people',
    tours,
    markIds,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1. Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2. Build the template
  // 3. Render that template using tour data form
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: `Log into your account`,
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: `Sign up your account`,
  });
};

exports.getAccount = (req, res) => {
  const tab = 'Settings';
  res.status(200).render('account', {
    title: `Your account`,
    tab,
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  const tab = 'My bookings';
  //1. Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  //2. FInd tours with the returned IDs
  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('account', {
    title: 'My Tours',
    tours,
    tab,
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const tab = 'My reviews';
  //1. Find all reviews
  const reviews = await Review.find({ user: req.user.id }).populate();

  res.status(200).render('account', {
    title: 'My Tours',
    reviews,
    tab,
  });
});

exports.getReviewForm = catchAsync(async (req, res) => {
  // 1. Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findById(req.params.tourId);

  res.status(200).render('review', {
    title: 'My Tour Reviews',
    tour,
  });
});
