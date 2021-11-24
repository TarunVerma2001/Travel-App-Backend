const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

console.log("I LOVE INDIA")

router.post('/signup', authController.signup);

module.exports = router;