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
const upload = require("../multerConfig/multer");

router
  .route("/createFoodItem/:restaurantId")
  .post(
    verifyParticularRestaurantOwner,
    upload.single("foodImage"),
    createFoodItem,
  );

router.route("/:foodItemId").get(readFoodItem);

router.route("/byRestaurant/:restaurantId").get(readFoodItemsByRestaurant);

router.route("/").get(readFoodItems);

router
  .route("/updateFoodItem/:foodItemId/:restaurantId")
  .patch(
    verifyParticularRestaurantOwner,
    upload.single("foodImage"),
    updateFoodItem,
  );

router
  .route("/deleteFoodItem/:foodItemId/:restaurantId")
  .delete(verifyParticularRestaurantOwner, deleteFoodItem);

module.exports = router;
