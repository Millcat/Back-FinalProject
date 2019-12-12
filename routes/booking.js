const express = require("express");
const router = new express.Router();
const bookingModel = require("./../models/Booking");
const tourModel = require("./../models/Tour");
const userModel = require("./../models/User");

router.post("/booking", (req, res) => {
  const bookingsFromShopCart = req.body;

  Promise.all(
    // because we have multiple requests (mutliple tourId to get in db) and have to wait to have info for each
    bookingsFromShopCart.map(booking => {
      return tourModel.findById(booking.tourId);
    })
  )
    .then(dbTours => {
      return dbTours.map((dbTour, i) => {
        const booking = bookingsFromShopCart[i];

        return {
          buyer: booking.buyer,
          tour: dbTour._id,
          date: dbTour.date,
          participants: Number(booking.participants),
          totalPrice: dbTour.price * Number(booking.participants)
        };
      });
    })
    .then(bookingsForDB => bookingModel.insertMany(bookingsForDB)) // insert in db all our bookings in the cart in separate booking
    .then(dbRes => res.status(200).json(dbRes))
    .catch(dbErr => res.status(500).json(dbErr));
});

router.get("/booking", (req, res) => {
  bookingModel
    .find()
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

router.get("/booking/:id", (req, res) => {
  // populate le tour model dans la Shop Cart
  bookingModel
    .findById(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

router.patch("/booking/:id", (req, res) => {
  // populate le tour model dans la Shop Cart
  bookingModel
    .findByIdandUpdate(req.params.id, req.body, { new: true })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

module.exports = router;
