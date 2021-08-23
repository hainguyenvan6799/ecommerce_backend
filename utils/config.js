require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_USERNAME = process.env.DB_USERNAME;
const MONGODB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
  PORT,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
};
