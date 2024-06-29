const { validationResult } = require("express-validator");

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    try {        
        // Validate email and password
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
    
        // Perform signup logic here
        const { email, password, name } = req.body;
        const user = await User.findOne({ email: email});
        if (user) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        let newUser = new User({ email, password: hashedPassword, name });
        newUser = await newUser.save();
        newUser.password = undefined;
    
        res.status(200).json({ message: 'Signup successful', data: newUser});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
    
        const { email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 401;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
    
        const token = jwt.sign({
            email: email,
            userId: user._id.toString(),
        },
        process.env.LOGIN_TOKEN_SECRET_KEY,
        { expiresIn: '1h'});
        res.status(200).json({ token: token, userId: user._id.toString() });
    } catch (error) { 
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};