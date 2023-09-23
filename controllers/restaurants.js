const Restaurants = require("../models/Restaurants");
const Users = require("../models/Users");

const createRestaurant = async (req, res, next) => {
  const { name, address, cuisine, rating, logo } = req.body;
  try {
    const existingRestaurant = await Restaurants.findOne({
      owner: req.user._id,
    });
    console.log(req.user);
    if (existingRestaurant) {
      return res.status(404).json({
        message: "You Already own a Restaurant !",
      });
    }
    const newRestaurant = new Restaurants({
      name,
      address,
      cuisine,
      rating,
      logo,
    });
    await newRestaurant.save();
    await Users.findByIdAndUpdate(req.user._id, {
      restaurantId: newRestaurant._id,
    });
    res.status(201).json({
      message: `Restaurant with name ${name} has been created successfully.`,
    });
  } catch (err) {
    next(err);
  }
};

const readRestaurant = async (req, res, next) => {
  const { restaurantId } = req.params;
  try {
    const foundRestaurant = await Restaurants.findOne({ _id: restaurantId });
    res.status(200).json({
      message: "Found the Restaurant successfully",
      restaurant: foundRestaurant,
    });
  } catch (err) {
    next(err);
  }
};

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurants.find();
    res
      .status(200)
      .json({ message: "Found all the Restaurants", restaurants: restaurants });
  } catch (err) {
    next(err);
  }
};

const updateRestaurant = async (req, res, next) => {
  const { restaurantId } = req.params;
  try {
    const updatedRestaurant = await Restaurants.findByIdAndUpdate(
      restaurantId,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json({
      message: "Updated the restaurant successfully",
      restaurant: updatedRestaurant,
    });
  } catch (err) {
    next(err);
  }
};

const deleteRestaurant = async (req, res, next) => {
  const { restaurantId } = req.params;
  try {
    const restaurant = await Restaurants.findOne({ _id: restaurantId });
    await Restaurants.findByIdAndDelete(restaurantId);
    res
      .status(200)
      .json({ message: `Deleted the restaurant ${restaurant.name}` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRestaurant,
  readRestaurant,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
};
