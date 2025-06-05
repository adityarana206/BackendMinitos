// routes/subcategory.routes.js
const express = require('express');
const router = express.Router();


const {
  createcategory,
  getAllCategories,
  getcategoryById,
  updatecategory,
  deletecategory
} = require('../controllers/category.controller');


// RESTful routes
router.post('/categories', createcategory);        // Create
router.get('/categories', getAllCategories);       // Read all
router.get('/categories/:id', getcategoryById);    // Read one
router.put('/categories/:id', updatecategory);     // Update
router.delete('/categories/:id', deletecategory);  // Delete

module.exports = router;
