// routes/subcategory.routes.js
const express = require('express');

const router = express.Router();

const {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  getSubcategoriesByCategory,
  updateSubcategory,
  deleteSubcategory
} = require('../controllers/subcategory.controller')


router.post('/createSubcategory',createSubcategory);
router.get('/getSubcategories', getSubcategories);
router.get('/getSubcategoryById/:id', getSubcategoryById);
router.get('/getSubcategoriesBycategory/:categoryId', getSubcategoriesByCategory);        
router.put('/updateSubcategory/:id', updateSubcategory);
router.delete('/deleteSubcategory/:id', deleteSubcategory);

module.exports = router;