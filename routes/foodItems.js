const router = require("express").Router();

const {
	createFoodItem,
	readFoodItem,
	readFoodItems,
	updateFoodItem,
	deleteFoodItem,
	readFoodItemsByRestaurant,
} = require("../controllers/foodItems");
const {
	verifyRestaurantOwner,
	verifyParticularRestaurantOwner,
} = require("../middleware/verify");

router
	.route("/createFoodItem/:restaurantId")
	.post(verifyParticularRestaurantOwner, createFoodItem);

router.route("/:foodItemId").get(readFoodItem);

router.route("/byRestaurant/:restaurantId").get(readFoodItemsByRestaurant);

router.route("/").get(readFoodItems);

router
	.route("/updateFoodItem/:foodItemId/:restaurantId")
	.patch(verifyParticularRestaurantOwner, updateFoodItem);

router
	.route("/deleteFoodItem/:foodItemId/:restaurantId")
	.delete(verifyParticularRestaurantOwner, deleteFoodItem);

module.exports = router;
