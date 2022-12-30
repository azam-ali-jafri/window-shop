const express = require("express")
const {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  forgetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  loadUser,
  updateShippingAddress,
} = require("../controller/userController")
const { isAuthenticated, isAdmin } = require("../middleware/getAuth")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/password/update").put(isAuthenticated, updateUserPassword)

router.route("/me").get(isAuthenticated, getUserDetails)
router.route("/me/update").put(isAuthenticated, updateUserProfile)
router.route("/loaduser").get(isAuthenticated, loadUser)
router.route("/update/shipinfo").put(isAuthenticated, updateShippingAddress)

router.route("/users").get(isAuthenticated, isAdmin, getAllUsers)
router
  .route("/user/:id")
  .get(isAuthenticated, isAdmin, getSingleUser)
  .put(isAuthenticated, isAdmin, updateUserRole)
  .delete(isAuthenticated, isAdmin, deleteUser)

router.route("/loadUser").get(loadUser)
module.exports = router
