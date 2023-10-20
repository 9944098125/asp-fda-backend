const FoodItems = require("../models/FoodItems");

const createFoodItem = async (req, res, next) => {
	const { restaurantId } = req.params;
	const { name, description, price } = req.body;
	try {
		const newFoodItem = new FoodItems({
			name,
			description,
			price,
			foodImage: req.file?.path,
			restaurantId,
		});
		await newFoodItem.save();
		res
			.status(201)
			.json({ message: `Food Item with name ${name} has been created` });
	} catch (err) {
		next(err);
	}
};

const readFoodItem = async (req, res, next) => {
	const { foodItemId } = req.params;
	try {
		const foodItem = await FoodItems.findOne({ _id: foodItemId });
		res
			.status(200)
			.json({ foodItem: foodItem, message: "Found the Food Item details" });
	} catch (err) {
		next(err);
	}
};

const readFoodItems = async (req, res, next) => {
	try {
		const foodItems = await FoodItems.find();
		res
			.status(200)
			.json({ message: "Found The Food Items", foodItems: foodItems });
	} catch (err) {
		next(err);
	}
};

const readFoodItemsByRestaurant = async (req, res, next) => {
	try {
		const { restaurantId } = req.params;
		const foodItems = await FoodItems.find({ restaurantId: restaurantId });
		res.status(200).json({
			message: "Found the Food Items in that restaurant",
			foodItems: foodItems,
		});
	} catch (err) {
		next(err);
	}
};

const updateFoodItem = async (req, res, next) => {
	const { foodItemId, restaurantId } = req.params;
	try {
		const updatedFoodItem = await FoodItems.findByIdAndUpdate(
			foodItemId,
			{
				$set: {
					name: req.body?.name,
					price: req.body?.price,
					description: req.body?.description,
					restaurantId: restaurantId,
					foodImage: req.file?.path,
				},
			},
			{ new: true },
		);
		await updatedFoodItem.save();
		res.status(200).json({
			message: "Updated the Food Item successfully",
			foodItem: updatedFoodItem,
		});
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const deleteFoodItem = async (req, res, next) => {
	const { foodItemId } = req.params;
	try {
		await FoodItems.findByIdAndDelete(foodItemId);
		res.status(200).json({ message: "Delete the Food Item successfully" });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createFoodItem,
	readFoodItem,
	readFoodItems,
	updateFoodItem,
	deleteFoodItem,
	readFoodItemsByRestaurant,
};
