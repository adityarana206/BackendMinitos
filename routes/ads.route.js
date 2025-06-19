const express = require('express');
const { createAds, updateAd, deleteAd, getAllAds } = require('../controllers/add.controller');
const router = express.Router();


router.post('/createads', createAds);


router.get('/getallads', getAllAds);

router.put('/updateads/:id', updateAd);
router.delete('/deleteads/:id', deleteAd);

module.exports = router;