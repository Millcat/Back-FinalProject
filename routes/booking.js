const express = require("express");
const router = new express.Router();
const bookingModel = require("./../models/Booking");



router.post("/booking", (req, res) => {
    bookingModel
        .populate("tour")
        .populate("booker")
        .create(req.body)
        .then(dbRes => {
            res.status(200).json(dbRes);
        })
        .catch(dbErr => {
            res.status(500).json(dbErr);
        });
});


module.exports = router;