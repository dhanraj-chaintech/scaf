require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

const authorization = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(422).json({
            message: 'Please provide a valid token'
        });
    }
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                "message": err.message
            });
        }

        const currentTimestamp = Math.floor(Date.now() / 1000); // Get current time in seconds
        if (decoded.exp <= currentTimestamp) {
            // Token is expired
            return res.status(401).json({
                message: 'Token expired'
            });
        }

        var original = req.body.name;
        req.body.name = decoded.id;

        next(original);
    });


}

module.exports = authorization 