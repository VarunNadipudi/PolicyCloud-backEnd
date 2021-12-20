const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();
router.use(express.json());

router.post('/insertItem', cartController.insertItem);
router.get('/getAllItems', cartController.getAllItems);
router.delete('/deleteItem/:id', cartController.deleteItem);
router.post('/deleteAllItems', cartController.deleteAllItems);

module.exports = router;