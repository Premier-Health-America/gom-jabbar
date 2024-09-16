const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied',
        });
    }

    try {
        // Verify the token using JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.nurse = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token, authorization denied',
        });
    }
};

module.exports = authMiddleware;
