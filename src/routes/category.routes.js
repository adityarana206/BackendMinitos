// routes/subcategory.routes.js
const express = require('express');
const router = express.Router();


const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');


// RESTful routes
router.post('/categories', createCategory);        // Create
router.get('/categories', getAllCategories);       // Read all
router.get('/categories/:id', getCategoryById);    // Read one
router.put('/categories/:id', updateCategory);     // Update
router.delete('/categories/:id', deleteCategory);  // Delete

module.exports = router;
