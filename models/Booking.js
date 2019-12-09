const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  booker: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour"
  },
  date: Date,
  participants: Number,
  totalPrice: Number,
  isValidated: Boolean
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;
