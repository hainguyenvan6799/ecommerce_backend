const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};

const readByRecipientSchema = new Schema(
  {
    _id: false,
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

const chatMessageSchema = new Schema(
  {
    chatRoomId: String,
    message: mongoose.Schema.Types.Mixed,
    files: String,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    postedByUser: String,
    readByRecipients: [readByRecipientSchema],
  },
  {
    timestamps: true,
  }
);

// chatMessageSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

chatMessageSchema.statics.createPostInChatRoom = async function (
  chatRoomId,
  message,
  postedByUser,
  filesInString
) {
  const post = await this.create({
    chatRoomId,
    message,
    postedByUser,
    readByRecipients: { readByUserId: postedByUser },
    files: filesInString,
  });

  const aggregate = await this.aggregate([
    { $match: { _id: post._id } },
    // convert field postedByUser from string to objectId
    { $addFields: { convertedId: { $toObjectId: "$postedByUser" } } },
    {
      $lookup: {
        from: "users",
        localField: "convertedId",
        foreignField: "_id",
        as: "postedByUser",
      },
    },
    // postedByUser return an array so use unwind operator to seperate array into specific object
    { $unwind: "$postedByUser" }, //postedByUser is from line 60

    { $addFields: { convertedChatRoomId: { $toObjectId: "$chatRoomId" } } },
    {
      $lookup: {
        from: "chatrooms",
        localField: "convertedChatRoomId",
        foreignField: "_id",
        as: "chatRoomInfo",
      },
    },
    { $unwind: "$chatRoomInfo" },
    { $unwind: "$chatRoomInfo.userIds" },

    {
      $addFields: {
        convertedChatRoomIdUserIds: { $toObjectId: "$chatRoomInfo.userIds" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "convertedChatRoomIdUserIds",
        foreignField: "_id",
        as: "chatRoomInfo.userProfile",
      },
    },
    { $unwind: "$chatRoomInfo.userProfile" },

    // // group data
    {
      $group: {
        _id: "$chatRoomInfo._id",
        postId: { $last: "$_id" },
        chatRoomId: { $last: "$chatRoomInfo._id" },
        message: { $last: "$message" },
        type: { $last: "$type" },
        postedByUser: { $last: "$postedByUser" },
        readByRecipients: { $last: "$readByRecipients" },
        chatRoomInfo: { $addToSet: "$chatRoomInfo.userProfile" },
        createdAt: { $last: "$createdAt" },
        updatedAt: { $last: "$updatedAt" },
      },
    },
  ]);
  return aggregate[0];
};

chatMessageSchema.statics.getConversationByRoomId = async function (
  chatRoomId,
  options = {}
) {
  try {
    return this.aggregate([
      { $match: { chatRoomId } },
      { $sort: { createdAt: -1 } }, // descending order
      {
        $addFields: { convertedPostedByUser: { $toObjectId: "$postedByUser" } },
      },
      {
        $lookup: {
          from: "users",
          localField: "convertedPostedByUser",
          foreignField: "_id",
          as: "postedByUser",
        },
      },
      { $unwind: "$postedByUser" },
      // //apply for pagination
      { $skip: options.page * options.limit },
      { $limit: options.limit },
      { $sort: { createdAt: 1 } },
    ]);
  } catch (error) {
    console.log("error on getConversationByRoomId: ", error);
  }
};

chatMessageSchema.statics.getLatestMessageFromChatRoom = async function (
  chatRoomId
) {
  return this.findOne({ chatRoomId }).sort({ createdAt: -1 }).limit(1);
};

const ChatMessages = mongoose.model("chatmessages", chatMessageSchema);

module.exports = { ChatMessages };
