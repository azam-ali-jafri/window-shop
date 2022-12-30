const catchAsyncError = require("../middleware/catchAsyncError")

exports.addToCart = catchAsyncError(async (req, res) => {
  const { product, quantity } = req.body
  const user = req.user
  const isPresent = await user.cart.find(
    (item) => item.product._id.toString() === product._id.toString()
  )
  if (!isPresent) {
    user.cart.push({ product, quantity })
  } else {
    user.cart.map((item) => {
      if (item.product._id.toString() === product._id.toString())
        item.quantity = quantity
    })
  }
  await user.save()

  res.status(200).json({
    success: true,
  })
})

exports.removeFromCart = catchAsyncError(async (req, res) => {
  const { product } = req.body
  const user = req.user
  user.cart = user.cart.filter(
    (item) => item.product._id.toString() !== product._id.toString()
  )
  await user.save()

  res.status(200).json({
    cart: user.cart,
  })
})
