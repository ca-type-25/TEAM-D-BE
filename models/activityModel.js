const mongoose = require ('mongoose')

const activitySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50
    },
    price: {
      type: Number,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'Price must be an integer'
      }
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 100
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true
    }
  }, { timestamps: true })

  const Activity = mongoose.model('Activity', activitySchema)

  module.exports = Activity