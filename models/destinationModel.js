const mongoose = require("mongoose")

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    geolocation: {
      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
      },
      latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
      },
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
//SHEMA
