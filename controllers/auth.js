const { validationResult } = require("express-validator");

exports.signup = (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Validate email and password
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
    
        // Perform signup logic here
    
        res.status(200).json({ message: 'Signup successful' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.login = (req, res) => {
    const { email, password } = req.body;
    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Perform login logic here
    // For example, you could use a database to check if the email and password match
    // If they do, return a JWT token

    res.status(200).json({ message: 'Login successful' });
};