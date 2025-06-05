const express = require('express');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller');
const router = express.Router();
router.post('/createcategories', createCategory);
router.get('/getcategoriesall', getAllCategories);
router.get('/getcategories/:id', getCategoryById);
router.put('/updatecategories/:id', updateCategory);

router.delete('/deletcategories/:id', deleteCategory);
module.exports = router;