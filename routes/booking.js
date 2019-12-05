const express = require("express");
const router = new express.Router();
const bookingModel = require("./../models/Booking");


// marche pas sur POSTMAN car need to populate
router.post("/booking", (req, res) => {
    bookingModel
        .create(req.body)
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


module.exports = router;