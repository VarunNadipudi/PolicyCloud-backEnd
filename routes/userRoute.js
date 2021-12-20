const express = require('express');
const userController = require('../controllers/userController');
const queryController = require('../controllers/queryController');

const router = express.Router();
router.use(express.json());

router.post('/login', userController.validateUser);
router.post('/signup', userController.registerUser);
router.put('/updateProfile', userController.updateProfile);
router.post('/payment', userController.payment);
router.post('/userExists', userController.userExists);
router.post('/insertQuery', queryController.insertQuery);

module.exports = router;