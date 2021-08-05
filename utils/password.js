// library hash password
const argon2 = require("argon2");

const hashPassword = async (targetPassword) => {
  const result = await argon2.hash(targetPassword);
  return result;
};

const verifyPassword = async (hashedPassword, plainPassword) => {
  const result = await argon2.verify(hashedPassword, plainPassword);
  return result;
};

module.exports = { hashPassword, verifyPassword };
