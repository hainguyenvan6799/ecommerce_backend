const { verifyToken } = require("../utils/token");

let verifyAuth = (req, res, next) => {
  // const authHeader = store.getState();
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return (
      res
        // .status(401)
        .json({ success: false, message: "Access token not found" })
    );
  }

  try {
    const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.userId;
    // req.userType = decoded.userType;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

// verifyAuth = (req, res, next) => {
//   const authHeader = store.getState();
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return (
//       res
//         // .status(401)
//         .json({ success: false, message: "Access token not found" })
//     );
//   }

//   try {
//     const decoded = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     return res.status(403).json({ success: false, message: "Invalid token" });
//   }
// };

module.exports = verifyAuth;
