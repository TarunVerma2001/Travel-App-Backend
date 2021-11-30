const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

//TODO update and resetPassword routes yet to implemted

console.log('I LOVE INDIA');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(userController.getAllUsers);

router.route('/:id').get(userController.getUser);

module.exports = router;
