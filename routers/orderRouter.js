const express = require('express');
const { getOrderList } = require('../controllers/orderController');
const router = express.Router();

router.post('/', getOrderList);



module.exports = router;