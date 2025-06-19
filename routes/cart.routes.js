// routes/cartRoutes.js
const express = require('express');
const router = express.Router();

const { userCart, addToCart, removeFromCart, updateQuantity } = require('../controllers/cart.controller');

// Get user cart
router.get('/getcart', userCart);

// Add to cart
router.post('/cart/add', addToCart);

// Remove from cart
router.post('/cart/remove', removeFromCart);

// Update quantity
router.post('/cart/update', updateQuantity);

module.exports = router;
