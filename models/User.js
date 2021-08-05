const mongoose = require("mongoose");
var findOrCreate = require("mongoose-findorcreate");

const Schema = mongoose.Schema;

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
});
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("users", UserSchema);
