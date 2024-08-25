const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapasync.js"); 
const Review = require("../models/reviews.js");
const {validateReview, isLoggedIn, isReviewAuthor} =require("../middleware.js");
const reviewController = require("../controllers/review.js");

//post Route
router.post(
    "/", 
    validateReview, 
    isLoggedIn, 
    wrapAsync(reviewController.createReview));


//delete review route
router.delete(
    "/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReviews));

module.exports = router;