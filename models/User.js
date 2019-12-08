const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  description: String,
  userPicture: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/svg/img_258083.png"
  },
  tours: {
    type: Schema.Types.ObjectId,
    ref: "Tour"
  },
  bookings: {
    type: Schema.Types.ObjectId,
    ref: "Bookings"
  }
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
