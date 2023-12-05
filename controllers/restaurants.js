const Restaurants = require("../models/Restaurants");
const Users = require("../models/Users");
const FoodItems = require("../models/FoodItems");

const createRestaurant = async (req, res, next) => {
	const { name, address, cuisine, rating, owner, logo } = req.body;
	try {
		if (!(name || address || cuisine || rating || owner)) {
			return res.status(400).json({ message: "All Fields are required !!" });
		}
		const existingRestaurant = await Restaurants.findOne({
			owner: owner,
		});
		// console.log(owner);
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
			owner,
		});
		await newRestaurant.save();
		await Users.findByIdAndUpdate(owner, {
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
			{
				$set: {
					...req.body,
				},
			},
			{ new: true },
		);
		await updatedRestaurant.save();
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
		await FoodItems.deleteMany({ restaurantId }).exec();
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
