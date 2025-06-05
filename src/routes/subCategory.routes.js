// routes/subcategory.routes.js
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategory.controller');

router.post('/', subcategoryController.createSubcategory);
router.get('/', subcategoryController.getSubcategories);
router.get('/:id', subcategoryController.getSubcategoryById);
router.get('/category/:categoryId', subcategoryController.getSubcategoriesByCategory);
router.put('/:id', subcategoryController.updateSubcategory);
router.delete('/:id', subcategoryController.deleteSubcategory);

module.exports = router;