// routes/subcategory.routes.js
const express = require('express');

const {
    createSubcategory,
    getSubcategories,   
    getSubcategoryById,
    getSubcategoriesBycategory,
    updateSubcategory,
    deleteSubcategory
} = require('../controllers/subcategory.controller');
const router = express.Router();


router.post('/',createSubcategory);
router.get('/', getSubcategories);
router.get('/:id', getSubcategoryById);
router.get('/category/:categoryId', getSubcategoriesBycategory);        
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

module.exports = router;