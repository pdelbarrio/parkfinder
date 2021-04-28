const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Park = require('../models/Park.model');

const userSchema = new Schema({
  username: String,
  password: String,
  email: { type: String, required: true, unique: true },
  profile_pic: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" },
  favorites: [{type: Schema.Types.ObjectId, ref: 'Park'}]
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;