const jwt = require("jsonwebtoken");
const sign = "secret";
// const sign = "test";

function createToken(payload) {
  return jwt.sign(payload, sign);
}

function verifyToken(token) {
  return jwt.verify(token, sign);
}

module.exports = { createToken, verifyToken };
