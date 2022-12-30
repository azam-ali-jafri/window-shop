const app = require("./app");
const connectToDB = require("./config/database");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.log(err.message);
});

require("dotenv").config({ path: "./config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

connectToDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`server listening on http://localhost:${process.env.PORT}`);
});

// can be due to database connectivity or something else
process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server due to ${err.message}`);
  server.close();
  process.exit(1);
});
