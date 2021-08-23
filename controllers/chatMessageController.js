const makeValidation = require("@withvoid/make-validation");

// models
const { ChatMessages } = require("../models/ChatMessages");

const { uploadFile } = require("../services/AWS");
const { SOCKET_EVENTS } = require("../utils/socketEvents");

const chatMessageController = {
  processFiles: async (files) => {
    const arrFiles = files.map(async (file) => {
      const result = await uploadFile(file);
      return result;
    });
    const newFiles = await Promise.all(arrFiles);
    const filesInString = JSON.stringify(newFiles);
    return filesInString;
  },
  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;

      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { messageText } = req.body;
      const messagePayload = { messageText };

      const currentLoggedUser = req.userId;

      if (req.files) {
        const filesInString = await chatMessageController.processFiles(
          req.files
        );

        const post = await ChatMessages.createPostInChatRoom(
          roomId,
          messagePayload,
          currentLoggedUser,
          filesInString
        );

        global.io.sockets
          .in(roomId)
          .emit(SOCKET_EVENTS.CHAT, { message: post, files: filesInString });
        return res
          .status(200)
          .json({ success: true, post, files: filesInString });
      }

      const post = await ChatMessages.createPostInChatRoom(
        roomId,
        messagePayload,
        currentLoggedUser
      );

      global.io.sockets.in(roomId).emit(SOCKET_EVENTS.CHAT, { message: post });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "error in chatmessageController" });
    }
  },

  getLatestMessage: async (req, res) => {
    const { chatRoomId } = req.params;
    const latestMessage = await ChatMessages.getLatestMessageFromChatRoom(
      chatRoomId
    );

    return res.json({ latestMessage });
  },
};

module.exports = { chatMessageController };
