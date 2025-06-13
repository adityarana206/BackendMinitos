// routes/order.js
const express = require('express');
const router = express.Router();
const {createOrder,getOrderById,getOrdersByUser,verifyPayment,getAllOrders}=  require('../controllers/order_razarpay.controlller')

  // Routes
router.post('/create', createOrder);
router.get('/user', getOrdersByUser);
router.post('/verify-payment', verifyPayment);
router.get('/:id', getOrderById);
router.get('/', getAllOrders);  

module.exports = router;
