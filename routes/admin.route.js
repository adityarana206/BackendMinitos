const  express = require('express');
const { createAdmin } = require('../controllers/admin.controller');
const router = express.Router();

router.post('/createadmins', createAdmin);


module.exports = router;
