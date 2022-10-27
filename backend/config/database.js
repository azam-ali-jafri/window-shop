const mongoose = require('mongoose')

connectToDB = () => {
  mongoose.connect(process.env.DB_URI).then((payload) => {
    console.log(`database connected with server ${payload.connection.host}`)
  })
}

module.exports = connectToDB
