const express = require('express');

const router = express.Router();

const { query } = require('express-validator');

const authController = require('../controllers/auth');

// /auth/login
router.post('/login', authController.login);

// /auth/signup
router.post('/signup', query('email').notEmpty(), authController.signup);

module.exports = router;