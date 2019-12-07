const express = require("express");
const router = new express.Router();
const tourModel = require("./../models/Tour");

//tested with POSTMAN => OK
router.post("/filter", (req, res) => {
    console.log(req.body)
    // received an array of string from axios (AllTours.jsx)
    let queryThematics = { thematics: { $in: req.body } } // mongoDB request
    tourModel
        .find(queryThematics)
        // pas findAll mais requete mongoose ??
        .then(dbRes => {
            console.log("------------------")
            console.log(dbRes)
            res.status(200).json(dbRes);
        })
        .catch(dbErr => {
            res.status(500).json(dbErr);
            console.log(dbErr)
        });
});


module.exports = router;