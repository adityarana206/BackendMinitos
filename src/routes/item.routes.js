// routes/subcategory.routes.js
const express = require('express');
const router = express.Router();
const item = require('../controllers/item.controller');

router.post('/createItem', item.createItem); // Create item
router.get('/getAllItems', item.getAllItems); // Get all items
router.get('/getItemById/:id', item.getItemById); // Get item by ID
router.put('/updateItem/:id', item.updateItem); // Update item by ID
router.delete('/deleteItem/:id', item.deleteItem); // Delete item by ID    


module.exports = router;