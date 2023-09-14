const mongoose = require("mongoose");

const foodItemsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    },
    foodImage: {
      type: String,
      data: Buffer,
      required: true,
    },
  },
  { timestamps: true },
);

const FoodItems = mongoose.model("FoodItem", foodItemsSchema);

module.exports = FoodItems;
