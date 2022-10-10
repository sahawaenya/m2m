const jwt = require("jsonwebtoken");

function createToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.TOKEN_KEY);
}

module.exports = { createToken, verifyToken };
