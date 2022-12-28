require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const mainRound = process.env.MAIN_ROUND || 10;
const refreshRound = process.env.REFRESH_ROUND || 10;

function generateAccessToken(user) {
    return new Promise((resolve, reject) => {
        jwt.sign({ user }, 
            secret, 
            { expiresIn: '10h' }, 
            (err, token) => (err ? reject(err) : resolve(token))
        );
    });
}

module.exports = {
    generateAccessToken,
};