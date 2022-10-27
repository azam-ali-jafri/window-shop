const Errorhandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../model/userModel")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")
const jwt = require("jsonwebtoken")

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
  })
  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  })

  sendToken(user, 200, res) // generating token for registered user and logging them in directly
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new Errorhandler("enter both", 400))
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401))
  }

  const isMatched = await user.comparePassword(password)

  if (!isMatched) {
    return next(new Errorhandler("Invalid email or password", 401))
  }

  sendToken(user, 200, res)
})

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  req.user = null
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })

  res.status(201).json({
    success: true,
    message: "logged out",
  })
})

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(new Errorhandler("user not found", 404))
  }

  const resetToken = await user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
  const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`

  const message = `your password reset token is \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore.`

  try {
    await sendEmail({
      email: user.email,
      subject: "Window shop password recovery",
      message: message,
    })

    res.status(200).json({
      success: true,
      message: `email sent to ${user.email} successfully`,
    })
  } catch (err) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    return next(new Errorhandler(err.message, 500))
  }
})

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    return next(new Errorhandler("reset password token is invalid or expired", 500))
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(new Errorhandler("password does not match", 500))
  }

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  sendToken(user, 200, res)
})

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(201).json({
    success: true,
    user,
  })
})

exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password")

  const isMatched = await user.comparePassword(req.body.oldPassword)

  if (!isMatched) {
    return next(new Errorhandler("password is incorrect", 500))
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new Errorhandler("password does not match", 500))
  }

  user.password = req.body.newPassword

  await user.save()

  res.status(200).json({
    success: true,
  })
})

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (req.body.avatar !== "") {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    })
    user.avatar.public_id = myCloud.public_id
    user.avatar.url = myCloud.secure_url
  }

  user.name = req.body.name

  await user.save()

  res.status(200).json({
    success: true,
    message: "updated",
  })
})

// admin api

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find()
  const usersCount = await User.countDocuments()

  res.status(201).json({
    success: true,
    users,
    usersCount,
  })
})

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new Errorhandler("user not found", 404))
  }

  res.status(201).json({
    success: true,
    user,
  })
})

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new Errorhandler("user not found", 404))
  }

  await User.findByIdAndUpdate(req.params.id, { $set: { role: req.body.role } })

  res.status(201).json({
    success: true,
    response: true,
  })
})

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new Errorhandler("user not found", 404))
  }

  await User.findByIdAndDelete(req.params.id)

  res.status(201).json({
    success: true,
    message: "user deleted",
  })
})

exports.loadUser = catchAsyncError(async (req, res, next) => {
  const user = req.user

  res.status(200).json({
    user,
  })
})

exports.updateShippingAddress = catchAsyncError(async (req, res) => {
  const user = req.user
  const { shipInfo } = req.body

  user.shipInfo = shipInfo
  await user.save()

  res.status(200).json({
    success: true,
  })
})
