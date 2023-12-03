const CartItems = require("../models/CartItems");
const FoodItem = require("../models/FoodItems");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Create a new cart for a user
const createCart = async (req, res, next) => {
	const { userId } = req.body;
	try {
		const cart = new CartItems({ userId, items: [] });
		await cart.save();
		res.status(201).json({ message: "Cart created", cart });
	} catch (err) {
		next(err);
	}
};

// Add an item to the cart
const addToCart = async (req, res, next) => {
	const { userId, foodItemId, quantity, foodItemName, foodItemPrice } =
		req.body;
	try {
		let cart = await CartItems.findOne({ userId });

		if (!cart) {
			cart = new CartItems({ userId, items: [] });
		}

		const existingItem = cart.items.find((item) =>
			item.foodItemId.equals(foodItemId),
		);

		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			cart.items.push({ foodItemId, quantity, foodItemName, foodItemPrice });
		}

		await cart.save();
		res.status(201).json({ message: "Item added to the cart", cart });
	} catch (err) {
		next(err);
	}
};

// Get the items in the cart
const getCartItems = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const cart = await CartItems.findOne({ userId });
		res.status(200).json({ message: "Cart items", cart });
	} catch (err) {
		next(err);
	}
};

// Remove an item from the cart
const removeItemFromCart = async (req, res, next) => {
	const { userId, foodItemId } = req.params;
	try {
		const cart = await CartItems.findOne({ userId });

		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		cart.items = cart.items.filter(
			(item) => !item.foodItemId.equals(foodItemId),
		);
		await cart.save();
		res.status(200).json({ message: "Item removed from the cart", cart: cart });
	} catch (err) {
		next(err);
	}
};

const incrementCartItem = async (req, res) => {
	const { foodItemId, userId } = req.params; // Extract the food item ID from the request parameters

	try {
		// Find the user's cart in the database
		const userCart = await CartItems.findOne({ userId: userId });

		if (!userCart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		// Find the cart item with the matching food item ID
		const cartItem = userCart.items.find((item) =>
			item.foodItemId.equals(foodItemId),
		);
		// console.log(userCart, foodItemId);

		if (cartItem) {
			// Increment the quantity
			cartItem.quantity += 1;

			// Save the updated cart back to the database
			await userCart.save();

			return res
				.status(200)
				.json({ message: "Incremented cart item quantity", cartItem });
		} else {
			return res.status(404).json({ message: "Cart item not found" });
		}
	} catch (error) {
		// Handle errors, e.g., send a 500 Internal Server Error response
		res.status(500).json({ error: "Server error" });
	}
};

const decrementCartItem = async (req, res) => {
	const { foodItemId, userId } = req.params; // Extract the food item ID from the request parameters

	try {
		// Find the user's cart in the database
		const userCart = await CartItems.findOne({ userId: userId });

		if (!userCart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		// Find the cart item with the matching food item ID
		const cartItemIndex = userCart.items.findIndex((item) =>
			item.foodItemId.equals(foodItemId),
		);

		if (cartItemIndex !== -1) {
			// Decrement the quantity
			if (userCart.items[cartItemIndex].quantity > 1) {
				userCart.items[cartItemIndex].quantity -= 1;
			} else {
				// Remove the item from the cart if the quantity becomes 0
				userCart.items.splice(cartItemIndex, 1);
			}

			// Save the updated cart back to the database
			await userCart.save();

			return res.status(200).json({
				message: "Decremented cart item quantity",
				cart: userCart.items,
			});
		} else {
			return res.status(404).json({ message: "Cart item not found" });
		}
	} catch (error) {
		// Handle errors, e.g., send a 500 Internal Server Error response
		res.status(500).json({ error: "Server error" });
	}
};

const payment = (req, res, next) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.SECRET_RAZOR_KEY,
		});
		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (err, order) => {
			if (err) {
				console.log(err);
				return res.status(400).json({ message: "Something went wrong..." });
			}
			res.status(200).json({ data: order });
		});
	} catch (err) {
		next(err);
	}
};

const verifyPayment = (req, res, next) => {
	try {
		// console.log(req.body);
		// console.log(process.env.SECRET_RAZOR_KEY, process.env.KEY_ID);
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.SECRET_RAZOR_KEY)
			.update(sign.toString())
			.digest("hex");
		if (razorpay_signature === expectedSign) {
			res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid Signature" });
		}
	} catch (err) {
		next(err);
	}
};

const clearCart = async (req, res, next) => {
	try {
		const { cartId } = req.params;
		const cart = await CartItems.findById(cartId);
		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		cart.items = [];
		await cart.save();
		res
			.status(200)
			.json({ message: "Order Placed successfully... Thank you..." });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createCart,
	addToCart,
	getCartItems,
	removeItemFromCart,
	incrementCartItem,
	decrementCartItem,
	payment,
	verifyPayment,
	clearCart,
};
