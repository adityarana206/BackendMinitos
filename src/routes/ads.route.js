const express = require('express');
const { createAds, updateAd, deleteAd, getAllAds } = require('../controllers/add.controller');
const router = express.Router();


router.post('/ads', createAds);


router.get('/ads', getAllAds);

router.put('/ads/:id', updateAd);
router.delete('/ads/:id', deleteAd);

module.exports = router;