// controllers/cartController.js

const Cart = require("../models/Cart.model");

// Get User Cart
const userCart = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) return res.status(400).json({ message: "userId is required" });

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res
        .status(200)
        .json({ message: "Cart is empty", cart: { items: [] } });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId)
    return res
      .status(400)
      .json({ message: "userId and productId are required" });

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove from Cart
const removeToCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId)
    return res
      .status(400)
      .json({ message: "userId and productId are required" });

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Quantity
const updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId)
    return res
      .status(400)
      .json({ message: "userId and productId are required" });

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.items[productIndex].quantity = quantity;

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { userCart, addToCart, removeToCart, updateQuantity };
