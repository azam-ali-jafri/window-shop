const Product = require('../model/productModel')
const Errorhandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')

exports.addReview = catchAsyncError(async (req, res, next) => {
  const { comment, rating } = req.body
  const { productId } = req.params

  const reviewBody = {
    user: req.user._id,
    avatar: req.user.avatar.url,
    name: req.user.name,
    comment,
    rating: Number(rating),
  }

  const product = await Product.findById(productId)

  if (!product) {
    return next(new Errorhandler('product not found', 404))
  }

  const isReviewed = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  )

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment
        rev.rating = rating
      }
    })
  } else {
    product.reviews.push(reviewBody)
    product.numOfReviews = product.reviews.length
  }

  let temp = 0
  product.reviews.forEach((rev) => {
    temp += rev.rating
  })

  product.ratings = temp / product.reviews.length

  await product.save({ validateBeforeSave: true })

  res.status(201).json({
    success: true,
    message: 'review added',
  })
})

exports.getAllReviews = catchAsyncError(async(req, res, next) => {
  const product = await Product.findById(req.params.productId)

  if (!product) {
    return next(new Errorhandler('product not found', 404))
  }

  const reviews = product.reviews

  res.status(201).json({
    success: true,
    reviews
  })
})

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const { reviewId, productId } = req.params
  const userId = req.user.id

  const product = await Product.findById(productId)

  if (!product) {
    return next(new Errorhandler('product not found', 404))
  }

  const review = product.reviews.find((rev) => rev.id === reviewId)

  if (review.user != userId) {
    return next(new Errorhandler("your don't have permission to do that"), 500)
  } else {
    product.reviews = product.reviews.filter((rev) => rev._id != reviewId)
  }

  let temp = 0
  product.reviews.forEach((rev) => {
    temp += rev.rating
  })

  product.ratings = temp / product.reviews.length
  product.numOfReviews = product.reviews.length

  product.save()

  res.status(201).json({
    success: true,
    message: 'review deleted',
  })
})
