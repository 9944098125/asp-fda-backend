const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
	items: [
		{
			foodItemId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "FoodItems",
				required: true,
			},
			foodItemName: {
				type: String,
				required: true,
			},
			foodItemPrice: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
});

const CartItems = mongoose.model("CartItems", cartItemsSchema);

module.exports = CartItems;
