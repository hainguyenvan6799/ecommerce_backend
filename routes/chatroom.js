const express = require("express");
const router = express.Router();

// middlewares
const verifyAuth = require("../middleware/auth");

const { chatRoomController } = require("../controllers/chatroomController");

// router.post("/initiate", verifyAuth, chatRoomController.initiate);
router.post("/", verifyAuth, chatRoomController.initiate);

router.get("/:roomId", chatRoomController.getConversationByRoomId);

// router.post("/getChatRoomsOfUserId", chatRoomController.getChatRoomsOfUserId);
router.get("/user/:userId", chatRoomController.getChatRoomsOfUserId);

module.exports = router;
