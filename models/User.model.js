const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  email: { required: true, type: String },
  avatar: { type: String, default: "https://res.cloudinary.com/parkfinder/image/upload/v1619196200/users/avatar_lkjiqe.png" },
  password: { type: String },
  favoriteParks: { },    
}
, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;