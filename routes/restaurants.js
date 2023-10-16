const router = require("express").Router();

const {
  createRestaurant,
  readRestaurant,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurants");
const {
  verifyRestaurantOwner,
  verifyParticularRestaurantOwner,
} = require("../middleware/verify");
const upload = require("../multerConfig/multer");

router
  .route("/createRestaurant")
  .post(verifyRestaurantOwner, upload.single("logo"), createRestaurant);

router.route("/:restaurantId").get(readRestaurant);

router.route("/").get(getAllRestaurants);

router
  .route("/updateRestaurant/:restaurantId")
  .patch(
    verifyParticularRestaurantOwner,
    upload.single("logo"),
    updateRestaurant,
  );

router
  .route("/deleteRestaurant/:restaurantId")
  .delete(verifyParticularRestaurantOwner, deleteRestaurant);

module.exports = router;
