const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

// Create a new cart for a user
router.post("/create", cartController.createCart);

// Add an item to the cart
router.post("/add", cartController.addToCart);

// Get the items in the cart for a specific user
router.get("/:userId", cartController.getCartItems);

// Remove an item from the cart
router.delete("/remove/:foodItemId/:userId", cartController.removeItemFromCart);

// increment items
router.patch(
	"/increment/:foodItemId/:userId",
	cartController.incrementCartItem,
);

// decrement items
router.patch(
	"/decrement/:foodItemId/:userId",
	cartController.decrementCartItem,
);

module.exports = router;
