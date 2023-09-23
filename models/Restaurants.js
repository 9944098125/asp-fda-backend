const mongoose = require("mongoose");

const restaurantsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    logo: {
      data: Buffer,
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true },
);

const Restaurants = mongoose.model("Restaurants", restaurantsSchema);

module.exports = Restaurants;
