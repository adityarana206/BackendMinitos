const express = require('express');
const {UpdateUserDetails} = require('../controllers/userdetails.controller');
const router = express.Router();

router.put('/:id', UpdateUserDetails);

module.exports = router;
