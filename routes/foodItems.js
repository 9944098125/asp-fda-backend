const router = require("express").Router();

const {
  createFoodItem,
  readFoodItem,
  readFoodItems,
  updateFoodItem,
  deleteFoodItem,
} = require("../controllers/foodItems");
const { verifyRestaurantOwner } = require("../middleware/verify");
const upload = require("../multerConfig/multer");

router
  .route("/createFoodItem/:restaurantId")
  .post(verifyRestaurantOwner, upload.single("foodImage"), createFoodItem);

router.route("/:foodItemId").get(readFoodItem);

router.route("/").get(readFoodItems);

router
  .route("/updateFoodItem/:foodItemId")
  .patch(verifyRestaurantOwner, updateFoodItem);

router
  .route("/deleteFoodItem/:foodItemId")
  .delete(verifyRestaurantOwner, deleteFoodItem);
