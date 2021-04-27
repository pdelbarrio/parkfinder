const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Park = require('../models/Park.model');

const userSchema = new Schema({
  username: String,
  password: String,
  favorites: [{type: Schema.Types.ObjectId, ref: 'Park'}]
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;