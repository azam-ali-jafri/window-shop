const Product = require("../model/productModel")
const Errorhandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const ApiFeatures = require("../utils/apiFeatures")
const cloudinary = require("cloudinary")

// admin apis
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = []

  if (typeof req.body.images === "string") {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  const imageLinks = []

  for (let i = 0; i < images.length; i++) {
    const myCloud = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Product-images",
    })

    imageLinks.push({
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    })
  }

  req.body.images = imageLinks
  req.body.retailer = req.user

  await Product.create(req.body)

  res.status(200).json({
    success: true,
    response: true,
  })
})

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new Errorhandler("product not found", 404))
  }

  if (req.body.images != JSON.stringify(product.images)) {
    const images = []

    if (typeof req.body.images === "string") {
      images.push(req.body.images)
    } else {
      images = req.body.images
    }

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    const newImageLinks = []

    for (let i = 0; i < images.length; i++) {
      const myCloud = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Product-images",
      })

      newImageLinks.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      })
    }

    req.body.images = newImageLinks
  } else {
    req.body.images = product.images
  }

  req.body.retailer = req.user

  product = await Product.findByIdAndUpdate(req.params.id, req.body)

  res.status(200).json({
    success: true,
    response: true,
    product,
  })
})

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new Errorhandler("product not found", 404))
  }

  if (product.images.length > 0) {
    product.images.forEach(async (item) => {
      await cloudinary.v2.uploader.destroy(item.public_id)
    })
  }

  await Product.findByIdAndDelete(req.params.id)
  res.status(201).json({
    success: true,
    response: true,
  })
})

// user apis
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8
  const productsCount = await Product.countDocuments()

  const apiFeature = new ApiFeatures(Product.find(), req.query)

  apiFeature.searchAndFilter().pagination(resultPerPage)

  let products = await apiFeature.query
  res.status(201).json({
    success: true,
    products,
    productsCount,
  })
})

exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new Errorhandler("product not found", 404))
  }

  res.status(201).json({
    success: true,
    product,
  })
})
