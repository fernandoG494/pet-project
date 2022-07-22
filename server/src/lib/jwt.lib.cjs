require('dotenv').config();
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env;

function sign(payload = {}) {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '40s'});
}

function verify(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    sign,
    verify
}