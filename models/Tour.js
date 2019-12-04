const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    name: String,
    tourPicture: {
        type: String,
    },
    dates: [Date],
    maxPeople: Number,
    thematics: {
        type: [String],
        enum: ["food", "street art", "fashion", "cinema", "insolite", "monument", "relax"],
    },
    description: String,
    duration: String,
    itinerary: [String],
    meetingLocation: String,
    languages: [String],
    price: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    totalParticipants: Number, // qui sera updaté en fonction des bookings
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
    },]
});

const tourModel = mongoose.model("Tour", TourSchema);

module.exports = tourModel;