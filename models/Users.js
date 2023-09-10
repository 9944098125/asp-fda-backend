const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    image: {
      data: Buffer,
      type: String,
      required: true,
    },
    isRestaurantOwner: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
