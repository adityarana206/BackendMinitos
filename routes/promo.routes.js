const express = require('express')
const router = express.Router();
const {createPromotion,updatePromotiom}= require('../controllers/promo.controller');

router.post('/promo',createPromotion);
router.put('/updatepromo',updatePromotiom)

module.exports = router;

