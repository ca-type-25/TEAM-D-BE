const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
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
      },
      latitude: {
        type: Number,
        required: true,
      },
    },
    country: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
