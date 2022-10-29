const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();
router.get('/', authController.isLoggedIn2);

module.exports = router;
