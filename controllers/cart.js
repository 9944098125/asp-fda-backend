const Cart = require("../models/Cart");

const createCartItem = async (req, res, next) => {
  const { userId, foodItemId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existingItem = cart.items.find(
      (item) => item.foodItemId === foodItemId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ foodItemId, quantity });
    }
    res.status(201).json({ message: "Added Item to cart", cart: cart });
    console.log(cart);
  } catch (err) {
    next(err);
  }
};

const readCartItems = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.status(200).json({ message: "Found the cart items", cart: cart });
  } catch (err) {
    next(err);
  }
};

const updateCartItem = async (req, res, next) => {
  const { userId, foodItemId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find((item) => item.foodItemId === foodItemId);

    if (cartItem) {
      cartItem.quantity = quantity;
      await cart.save();
      res
        .status(203)
        .json({ message: "Updated the cart successfully", cart: cart });
    } else {
      res.status(404).json({ message: "Item not found in the cart" });
    }
  } catch (err) {
    next(err);
  }
};

const deleteCartItem = async (req, res, next) => {
  const { userId, foodItemId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.foodItemId !== foodItemId);
    await cart.save();
    res.status(200).json({
      message: "Deleted the item successfully",
      cart: cart,
      foodItemId: foodItemId,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCartItem,
  readCartItems,
  updateCartItem,
  deleteCartItem,
};
