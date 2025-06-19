const express = require('express')
const router = express.Router();
const {createPromotion,updatePromotion}= require('../controllers/promo.controller');

router.post('/createpromo',createPromotion);
router.put('/updatepromo',updatePromotion)

module.exports = router;

