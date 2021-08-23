const express = require("express");
const router = express.Router();

const upload = require("../utils/fileHelper");

// controllers
const {
  chatMessageController,
} = require("../controllers/chatMessageController");

// middlewares
const verifyAuth = require("../middleware/auth");

// routes
router.post(
  "/postMessage/:roomId",
  [verifyAuth, upload],
  chatMessageController.postMessage
);

router.get(
  "/getLatestMessage/:chatRoomId",
  chatMessageController.getLatestMessage
);

module.exports = router;
