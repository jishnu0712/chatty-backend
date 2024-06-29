const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const authController = require('../controllers/auth');

// /auth/login
router.post('/login', [
    body('email').notEmpty().isEmail().withMessage('Please enter valid email'),
    body('password').notEmpty().isLength({min: 3}),
], authController.login);

// /auth/signup
router.post('/signup', [
    body('email').notEmpty().isEmail().withMessage('Please enter valid email'),
    body('password').notEmpty().isLength({min: 3}),
    body('name').notEmpty().isLength({min: 1}).withMessage('Name too short'),
], authController.signup);

module.exports = router;