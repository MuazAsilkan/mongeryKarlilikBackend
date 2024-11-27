const express = require('express');
const { getProductList } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProductList);



module.exports = router;