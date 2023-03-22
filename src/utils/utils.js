const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../constant/api.constant');

const generateToken = (user) => {
    const token = jwt.sign({ ...user }, SECRET_KEY, { expiresIn: '24h' });
    return token;
}

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['demo'];
    }
    return token;
}

module.exports = {
    generateToken,
    cookieExtractor
}