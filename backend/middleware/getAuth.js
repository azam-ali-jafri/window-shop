const catchAsyncError = require("./catchAsyncError")
const Errorhandler = require("../utils/errorHandler")
const User = require("../model/userModel")
const jwt = require("jsonwebtoken")

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies // requesting param named token from cookies

  if (!token) {
    return next(new Errorhandler("login first", 404))
  }

  // token always stores in hashed form, so to access it, it should be DeHashed first
  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  req.user = await User.findById(decodedData.id).populate({
    path: "cart.product",
  })

  next()
})

exports.isAdmin = catchAsyncError(async (req, res, next) => {
  if (!req.user) {
    return next(new Errorhandler("please login in first", 500))
  }

  // checking logged in user role and acting accordingly
  if (req.user.role != "admin") {
    return next(new Errorhandler("non-admin cannot access this page"))
  }

  next()
})
