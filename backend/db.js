const mongoose = require('mongoose')

const conn = () => {
  mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')
}

module.exports = conn