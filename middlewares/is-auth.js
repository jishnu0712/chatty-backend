const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        const error = new Error('Authorization token is missing');
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        const error = new Error('Token not provided');
        error.statusCode = 401;
        return next(error);
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.LOGIN_TOKEN_SECRET_KEY);
    } catch (err) {
        err.statusCode = 500;
        return next(err);
    }

    if (!decodedToken) {
        const error = new Error('Invalid token');
        error.statusCode = 401;
        return next(error);
    }

    req.userId = decodedToken.userId;
    next();
};
