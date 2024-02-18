const { User } = require("../models/User");
const { verifyPassword, hashPassword } = require("../utils/password");
const { signToken } = require("../utils/token");
const validateInputs = require("../utils/validateInput");

const authController = {
  getCurrentUserOld: async (req, res) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId).select("-password");
      if (!user) return res.json({ success: false, message: "User not found" });

      res.json({ success: true, user });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  getCurrentUser: async (req, res) => {
    const userId = req.userId;

    try {
      const user = await User.getUserWithoutField(userId, "password");

      if (!user) return res.json({ success: false, message: "User not found" });

      res.json({ success: true, user });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  loginOld: async (req, res) => {
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
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.json({
        success: true,
        message: "User logged in successfully",
        accessToken,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },
  login: (req, res) => {
    return res.json({
      success: true,
      message: "User logged in successfully",
      accessToken: req.accessToken,
      user: req.user,
    });
  },
  signup: async (req, res) => {
    const { firstname, lastname, username, email, password, phone } = req.body;

    try {
      const user = await User.checkUserExist(username, email); //return an array of users
      if (user.length) {
        return (
          res
            // .status(400)
            .json({ success: false, message: "Username/email already taken" })
        );
      }

      // all good
      const hashedPassword = await hashPassword(password);
      const data = {
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        phone,
      };
      const newUser = new User(data);
      await newUser.save();

      // Return token
      const accessToken = await signToken(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.json({
        success: true,
        message: "User created successfully",
        accessToken,
        user: newUser,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },
};

module.exports = authController;
