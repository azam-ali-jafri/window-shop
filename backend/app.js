const cookieParser = require("cookie-parser")
const express = require("express")
const errorMiddleware = require("./middleware/error")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" })
}

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(fileUpload())

//routes
const productRoute = require("./route/productRoute")
const userRouter = require("./route/userRoute")
const reviewRouter = require("./route/reviewRoute")
const orderRouter = require("./route/orderRoute")
const paymentRouter = require("./route/paymentRoute")
const cartRouter = require("./route/cartRoute")

app.use("/api/v1", productRoute)
app.use("/api/v1", userRouter)
app.use("/api/v1", reviewRouter)
app.use("/api/v1", orderRouter)
app.use("/api/v1", paymentRouter)
app.use("/api/v1", cartRouter)

app.use(express.static(path.join(__dirname, "../frontend/build")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

app.use(errorMiddleware) // middleware for handeling error so that app won't crash everytime

module.exports = app
