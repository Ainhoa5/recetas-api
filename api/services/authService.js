const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
    return jwt.sign({ userId: user._id, nombre: user.nombre }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

module.exports = { generateAccessToken };
