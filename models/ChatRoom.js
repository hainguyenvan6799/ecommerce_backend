const mongoose = require("mongoose");
const { ChatMessages } = require("./ChatMessages");

const CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: "consumer-to-consumer",
  CONSUMER_TO_SUPPORT: "consumer-to-support",
};

const ChatRoomSchema = new mongoose.Schema({
  userIds: Array,
  chatInitiator: String,
});

ChatRoomSchema.statics.findChatRoomByUserIds = async function (userIds) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
    });

    return availableRoom;
  } catch (error) {
    console.log("error on find chat room by user ids");
  }
};

ChatRoomSchema.statics.findChatRoomThatHasUserId = async function (userId) {
  try {
    const availableRoom = await this.find({
      userIds: userId,
    });

    const result = availableRoom.map(async (room) => {
      const latestMessage = await ChatMessages.getLatestMessageFromChatRoom(
        room._id
      );

      return {
        userIds: room._doc.userIds,
        _id: room._doc._id,
        chatInitiator: room._doc.chatInitiator,
        chatInitiatorName: room._doc.chatInitiatorName,
        latestMessage,
      };
    });

    const newResult = await Promise.all(result);

    return newResult;
  } catch (error) {
    console.log("error on findChatRoomThatHasUserId", error);
  }
};

ChatRoomSchema.statics.createChatRoom = async function (
  userIds,
  chatInitiator
) {
  try {
    const newRoom = await this.create({ userIds, chatInitiator });

    return newRoom;
  } catch (error) {
    console.log("error on create chat room", error);
  }
};

ChatRoomSchema.statics.initiateChat = async function (userIds, chatInitiator) {
  try {
    const availableRoom = await this.findChatRoomByUserIds(userIds);

    if (availableRoom) {
      return {
        isNew: false,
        message: "retrieving an old chat room",
        chatRoomId: availableRoom._doc._id,
      };
    }

    const newRoom = await this.createChatRoom(userIds, chatInitiator);
    return {
      isNew: true,
      message: "creating a new chatroom",
      chatRoomId: newRoom._doc._id,
    };
  } catch (error) {
    console.log("error on start chat method", error);
  }
};

ChatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
  try {
    const room = await this.findById(roomId);

    return room;
  } catch (error) {
    console.log("error on getChatRoomByRoomId: ", error);
  }
};

ChatRoomSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ChatRoom = mongoose.model("chatroom", ChatRoomSchema);

module.exports = { ChatRoom };
