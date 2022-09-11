const AppError = require('../utils/appError');
const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.setTourUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    req.body.user = req.user.id;
    next();
};

exports.marchId = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (req.user.role === 'admin') return next();

    if (review.user.id.toString() !== req.user.id.toString()) {
        return next(new AppError('You may only delete your own review', 403));
    }
    next();
});

exports.updateReview = catchAsync(async (req, res, next) => {
    const filteredBody = filterObj(req.body, 'review', 'rating');

    const doc = await Review.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID'), 404);
    }

    res.status(200).json({
        status: 'success',
        data: {
            review: doc
        }
    });
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
