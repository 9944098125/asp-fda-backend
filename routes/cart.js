const express = require("express");
const router = express.Router();

const {
  createCartItem,
  readCartItems,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cart");
const { verifyToken } = require("../middleware/verify");

router.route("/create").post(verifyToken, createCartItem);

router.route("/:userId").get(verifyToken, readCartItems);

router.route("/update").patch(verifyToken, updateCartItem);

router.route("/delete/:userId/:foodItemId").delete(verifyToken, updateCartItem);

module.exports = router;
