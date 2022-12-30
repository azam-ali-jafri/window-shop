const express = require('express')
const { processPayment, getStripeApiKey } = require('../controller/paymentController')
const {isAuthenticated} = require('../middleware/getAuth')
const router = express.Router()

router.route('/payment/process').post(isAuthenticated, processPayment)
router.route('/payment/getApiKey').get(isAuthenticated, getStripeApiKey)

module.exports = router