const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get Cart (pass userId in query or body)
router.get('/', cartController.getCart);

// Add to Cart (pass userId in body)
router.post('/add', cartController.addToCart);

// Remove from Cart (pass userId in body)
router.post('/remove', cartController.removeFromCart);

// Update Cart (pass userId in body)
router.post('/update', cartController.updateCart);

module.exports = router;
