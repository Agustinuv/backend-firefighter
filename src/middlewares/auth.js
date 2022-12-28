const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({
            message: 'No token provided!',
        });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!',
            });
        }
        req.userId = decoded.id;
        next();
    });
}