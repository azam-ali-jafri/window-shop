const catchAsyncError = require('../middleware/catchAsyncError')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.processPayment = catchAsyncError(async(req, res, next) => {

    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr'
    })

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    })
})

exports.getStripeApiKey = catchAsyncError(async(req, res) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})