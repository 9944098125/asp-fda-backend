const router = require("express").Router();

const {
	createRestaurant,
	readRestaurant,
	getAllRestaurants,
	updateRestaurant,
	deleteRestaurant,
} = require("../controllers/restaurants");
const {
	verifyParticularRestaurantOwner,
	verifyRestaurantOwner,
} = require("../middleware/verify");

router.route("/createRestaurant").post(verifyRestaurantOwner, createRestaurant);

router.route("/:restaurantId").get(readRestaurant);

router.route("/").get(getAllRestaurants);

router
	.route("/updateRestaurant/:restaurantId")
	.patch(verifyParticularRestaurantOwner, updateRestaurant);

router
	.route("/deleteRestaurant/:restaurantId")
	.delete(verifyParticularRestaurantOwner, deleteRestaurant);

module.exports = router;
