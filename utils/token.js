const jwt = require("jsonwebtoken");

const signToken = (payload, secretKey, config = null) => {
  if (config) {
    const { expiresIn } = config;
    return jwt.sign(payload, secretKey, { expiresIn });
  }
  return jwt.sign(payload, secretKey);
};

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

module.exports = { signToken, verifyToken };
