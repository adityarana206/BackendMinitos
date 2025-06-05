// routes/subcategory.routes.js
const express = require('express');
const router = express.Router();
const item = require('../controllers/item.controller');

router.post('/', item.createItem); // Create item
router.get('/', item.getAllItems); // Get all items
router.get('/:id', item.getItemById); // Get item by ID
router.put('/:id', item.updateItem); // Update item by ID
router.delete('/:id', item.deleteItem); // Delete item by ID    


module.exports = router;