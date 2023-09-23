const router = require("express").Router();

const {
  createRestaurant,
  readRestaurant,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurants");
const { verifyRestaurantOwner } = require("../middleware/verify");
const upload = require("../multerConfig/multer");

router
  .route("/createRestaurant")
  .post(verifyRestaurantOwner, upload.single("logo"), createRestaurant);

router.route("/:restaurantId").get(readRestaurant);

router.route("/").get(getAllRestaurants);

router
  .route("/updateRestaurant/:restaurantId")
  .patch(verifyRestaurantOwner, updateRestaurant);

router
  .route("/deleteRestaurant/:restaurantId")
  .delete(verifyRestaurantOwner, deleteRestaurant);

module.exports = router;
