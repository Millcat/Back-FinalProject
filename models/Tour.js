const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    name: String,
    tourPicture: {
        type: String,
    },
    dates: [Date],
    // revoir si c'est bien un array of Date qu'on veut
    maxPeople: Number,
    thematics: {
        type: [String],
        enum: ["Food", "Street Art", "Fashion", "Cinema", "Insolite", "Monument", "Art", "Sports"],
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