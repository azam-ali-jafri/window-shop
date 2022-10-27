const { addToCart, removeFromCart } = require("../controller/cartController")
const { isAuthenticated } = require("../middleware/getAuth")

const router = require("express").Router()

router.route("/cart").post(isAuthenticated, addToCart)
router.route("/cart/delete").post(isAuthenticated, removeFromCart)

module.exports = router
