const makeValidation = require("@withvoid/make-validation");

const { ChatRoom } = require("../models/ChatRoom");
const { User } = require("../models/User");
const { ChatMessages } = require("../models/ChatMessages");

const chatRoomController = {
  initiate: async (req, res) => {
    try {
      const validation = makeValidation((types) => ({
        payload: req.body,
        checks: {
          userIds: {
            type: types.array,
            options: { unique: true, empty: false, stringOnly: true },
          },
        },
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { userIds } = req.body;
      const { userId: chatInitiator } = req;
      const allUserIds = [...userIds, chatInitiator];
      const chatRoom = await ChatRoom.initiateChat(allUserIds, chatInitiator);
      // console.log("Chatroom", chatRoom);
      return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  getConversationByRoomId: async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await ChatRoom.getChatRoomByRoomId(roomId);

      if (!room) {
        return res.status(400).json({
          success: false,
          message: "No room exists for this id",
        });
      }

      const users = await User.getUserByIds(room.userIds);
      const options = {
        page: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      };

      const conversation = await ChatMessages.getConversationByRoomId(
        roomId,
        options
      );
      return res.json({
        success: true,
        conversation,
        users,
      });
    } catch (error) {
      console.log("error on getConversationByRoomId: ", error);
    }
  },

  getChatRoomsOfUserId: async (req, res) => {
    const { userId } = req.body;
    const chatRooms = await ChatRoom.findChatRoomThatHasUserId(userId);
    return res.json({ success: true, chatRooms });
  },
};

module.exports = { chatRoomController };
