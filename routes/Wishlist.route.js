// routes/wishlist.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/Wishlist.controller');

// Get Wishlist
router.get('/getWishlist', wishlistController.getWishlist);

// Add to Wishlist
router.post('/addWhislist', wishlistController.addToWishlist);

// Remove from Wishlist
router.post('/removefromWhislist', wishlistController.removeFromWishlist);

module.exports = router;
