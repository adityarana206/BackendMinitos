// routes/subcategory.routes.js
const express = require('express');
const router = express.Router();
const {createItem, getAllItems, getItemById, updateItem, deleteItem} = require('../controllers/item.controller');

router.post('/createItem', createItem); // Create item
router.get('/getAllItems', getAllItems); // Get all items
router.get('/getItemById/:id', getItemById); // Get item by ID
router.put('/updateItem/:id', updateItem); // Update item by ID
router.delete('/deleteItem/:id', deleteItem); // Delete item by ID    


module.exports = router;