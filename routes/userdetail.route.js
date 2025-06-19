const express = require('express');
const {UpdateUserDetails} = require('../controllers/userdetails.controller');
const router = express.Router();

router.put('/updatecustomer:id', UpdateUserDetails);

module.exports = router;
