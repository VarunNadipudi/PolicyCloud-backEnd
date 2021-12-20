const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();
router.use(express.json());

router.get('/getAllItems', orderController.getAllItems);

module.exports = router;