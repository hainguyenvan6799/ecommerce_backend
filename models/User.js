const mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

const { USER_ROLE } = require("../config/userRoles");

const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    min: 5,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  facebookId: {
    type: String,
  },
  role: {
    type: String,
    enum: [USER_ROLE.ADMIN, USER_ROLE.GUEST, USER_ROLE.LEAD],
    default: USER_ROLE.GUEST,
  },
});
UserSchema.plugin(findOrCreate);

UserSchema.statics.getUserWithoutField = async function (userId, fieldName) {
  try {
    const user = await this.findById(userId).select(`-${fieldName}`);
    return user;
  } catch (error) {
    throw error;
  }
};

UserSchema.statics.getUserByUserName = async function (username) {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};

UserSchema.statics.getUserByEmail = async function (email) {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};

UserSchema.statics.checkUserExist = async function (username, email) {
  try {
    const user = await this.find().or([{ username }, { email }]);
    return user;
  } catch (error) {
    throw error;
  }
};

UserSchema.statics.getUserById = async function (userId) {
  try {
    const user = await this.findOne({ _id: userId });
    return user;
  } catch (error) {
    throw error;
  }
};

UserSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = this.find({ _id: { $in: ids } });

    return users;
  } catch (error) {
    console.log("error on get user by ids: ", error);
  }
};

const User = mongoose.model("users", UserSchema);

module.exports = { User, USER_TYPES };
// module.exports = USER_TYPES;
