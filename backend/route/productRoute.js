const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getOneProduct,
  deleteProduct,
} = require('../controller/productController')
const router = express.Router()
const { isAuthenticated, isAdmin } = require('../middleware/getAuth')

router.route('/products').get(getAllProducts)
router.route('/product/new').post(isAuthenticated, isAdmin, createProduct)
router
  .route('/product/:id')
  .get(getOneProduct)
  .put(isAuthenticated, isAdmin, updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct)
module.exports = router
