const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: {
    type: String,
    unique: true,
  },
  code: String,
  varified: Boolean,
  password: String,
});

const User = mongoose.model("User", UserSchema, "users");
const Panding = mongoose.model("Panding", UserSchema, "panding");

module.exports = { User, Panding };
