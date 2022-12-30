const express = require('express')
const { addReview, deleteReview, getAllReviews } = require('../controller/reviewController')
const { isAuthenticated } = require('../middleware/getAuth')
const router = express.Router()

router.route('/product/:productId/review').post(isAuthenticated, addReview)
router.route('/product/:productId/reviews').get(isAuthenticated, getAllReviews)
router.route('/product/:productId/review/:reviewId').delete(isAuthenticated, deleteReview)

module.exports = router