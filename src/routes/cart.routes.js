// routes/cartRoutes.js
const express = require('express');
const router = express.Router();

const {
  userCart,
  addToCart,removeToCart,updateQuantity
} = require('../controllers/cart.controller');

// Get user cart
router.get('/cart', userCart);

// Add to cart
router.post('/cart/add', addToCart);

// Remove from cart
router.post('/cart/remove', removeToCart);

// Update quantity
router.post('/cart/update', updateQuantity);

module.exports = router;
