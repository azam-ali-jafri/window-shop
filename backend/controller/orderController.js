const Order = require('../model/orderModel')
const Product = require('../model/productModel')
const Errorhandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')

exports.addOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    customer: req.user.id,
  })

  res.status(201).json({
    success: true,
    order,
  })
})

exports.getAllOrder = catchAsyncError(async(req, res, next) => {
    const orders = await Order.find();
    const ordersCount = await Order.countDocuments();

    res.status(201).json({
        status: true,
        orders,
        ordersCount
    })
})

exports.getSingleOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.orderId).populate('customer', 'name email').populate('orderItems.product')

    if (!order) {
        return next(new Errorhandler('order not found', 404))
    }

    res.status(201).json({
        success: true,
        order
    })
})

// logged in user order list
exports.getUserOrders = catchAsyncError(async(req, res, next) => {
  const orders = await Order.find({customer: req.user.id})

  res.status(201).json({
    success: true,
    orders
  })
})

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId) 

  if (!order) {
    return next(new Errorhandler('order not found', 404))
  }

  await Order.findByIdAndUpdate(req.params.orderId, {$set: {orderStatus: req.body.orderStatus}})

  if (req.body.orderStatus === "Delivered") {
    await updateStock(order);
  }

  res.status(200).json({
    success: true, 
    order
  })
})

const updateStock = async (order) => {
  order.orderItems.forEach(async ele => {
    const product = await Product.findById(ele.product)
    product.stock -= ele.quantity
    product.save({validateBeforeSave: true})
  });
}

exports.deleteOrder = catchAsyncError(async(req, res, next) => {
  await Order.findByIdAndDelete(req.params.orderId)

  res.status(200).json({
    success: true,
    message: 'order deleted'
  })
})