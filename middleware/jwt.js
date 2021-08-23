const jwt = require("jsonwebtoken");
// models
const { User } = require("../models/User");
const store = require("../services/redux");

// utils
const { verifyPassword } = require("../utils/password");
const { signToken } = require("../utils/token");

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

const encode = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username/password" });
  }

  try {
    const user = await User.getUserByUserName(username);
    if (!user) {
      return (
        res
          // .status(400)
          .json({ success: false, message: "Incorrect username/password" })
      );
    }

    const passwordValid = await verifyPassword(user.password, password);

    if (!passwordValid) {
      return (
        res
          // .status(400)
          .json({ success: false, message: "Incorrect username/password" })
      );
    }

    const accessToken = signToken(
      {
        userId: user._id,
        // userType: user.role
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    req.accessToken = accessToken;

    store.dispatch({ type: "SAVE_TOKEN", accessToken });
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.error });
  }
};

const decode = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(400)
      .json({ success: false, message: "No access token provided" });
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    // req.userType = decoded.type;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = { encode, decode };
