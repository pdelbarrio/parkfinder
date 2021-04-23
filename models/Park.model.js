const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const parkSchema = new Schema({
  name: { type: String },
  email: { type: String, required },
  img: { type: String, default },
  password: { type: String },
  favoriteParks: { type: Types.ObjectId, ref: "Parks" },
})
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;