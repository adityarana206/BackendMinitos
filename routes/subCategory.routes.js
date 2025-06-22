// routes/subcategory.routes.js
const express = require('express');

const router = express.Router();

const {createSubcategory,getSubcategories,getSubcategoryById,updateSubcategory,deleteSubcategory} = require('../controllers/subCategory.controller')


router.post('/createSubcategory',createSubcategory);
router.get('/getSubcategories', getSubcategories);
router.get('/getSubcategoryById/:id', getSubcategoryById);
//router.get('/getSubcategoriesBycategory/:categoryId', getSubcategoriesBycategory);        
router.put('/updateSubcategory/:id', updateSubcategory);
router.delete('/deleteSubcategory/:id', deleteSubcategory);

module.exports = router;