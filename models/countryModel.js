const mongoose = require ('mongoose')

const countrySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50
    },
    capital: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50
    },
    population: {
        type: Number,
        min: 0,
        validate: {
          validator: Number.isInteger,
          message: 'Price must be an integer'
      }
    },
  }, { timestamps: true })

  const Country = mongoose.model('Country', countrySchema)

  module.exports = Country