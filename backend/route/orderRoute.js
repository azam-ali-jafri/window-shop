const express = require('express')
const {
  addOrder,
  getAllOrder,
  getSingleOrder,
  getUserOrders,
  updateOrder,
  deleteOrder,
} = require('../controller/orderController')
const router = express.Router()
const { isAuthenticated, isAdmin } = require('../middleware/getAuth')

router.route('/order/new').post(isAuthenticated, addOrder)
router
  .route('/order/:orderId')
  .get(isAuthenticated, getSingleOrder)
  .put(isAuthenticated, isAdmin, updateOrder)
  .delete(isAuthenticated, isAdmin, deleteOrder)
router.route('/orders').get(isAuthenticated, isAdmin, getAllOrder)
router.route('/orders/me').get(isAuthenticated, getUserOrders)

module.exports = router
