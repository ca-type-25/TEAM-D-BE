const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Winter Trips', 'Summer Trips', 'Autumn Trips', 'Spring Trips'],
    required: true,
    unique: true
  }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category