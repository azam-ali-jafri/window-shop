const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [20, "max character exceeded"],
    minLength: [4, "name must be more than 4 character"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    select: false,
    required: true,
    minLength: [8, "password must be greater than 8 character"],
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  shipInfo: {
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    pincode: { type: Number },
    phoneNo: { type: Number },
    country: { type: String, default: "" },
    state: { type: String, default: "" },
  },
  cart: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: "Product" },
      quantity: { type: Number },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String, // token for sending email for password reset
  resetPasswordExpire: String,
})

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN for checking weather user is logged in or not & for getting logged in user details as well throught its id

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// comparing password during login event
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

// creating random token through crypto then storing it in DB in hash form with sha256 algo
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex")

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
  this.resetPasswordExpire = Date.now() + 15 * 60 * 60

  return resetToken
}

module.exports = mongoose.model("User", userSchema)
