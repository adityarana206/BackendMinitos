// routes/order.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place Order
router.post('/place', orderController.placeOrder);

// Get User Orders
router.get('/user', orderController.getUserOrders);

// Get All Orders (Admin)
router.get('/all', orderController.getAllOrders);

module.exports = router;
