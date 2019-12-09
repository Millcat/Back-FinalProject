// const express = require("express");
// const router = new express.Router();
// const tourModel = require("../models/Tour");
// const bookingModel = require("../models/Booking");
// const userModel = require("../models/User");

// router.get("/shopcart", (req, res) => {
//     tourModel
//         .findById(req.params)
//         // demander aux TA...parce que sur le shopCart on veut récupérer les infos du tour selectionné
//         .then(dbRes => {
//             res.status(200).json(dbRes);
//         })
//         .catch(dbErr => {
//             res.status(500).json(dbErr);
//         });
// });

// router.post("/tours", (req, res) => {
//     tourModel
//         .create(req.body)
//         .then(dbRes => {
//             res.status(200).json(dbRes);
//         })
//         .catch(dbErr => {
//             res.status(500).json(dbErr);
//         });
// });

// router.delete("/tours/:id", (req, res) => {
//     tourModel
//         .findByIdAndRemove(req.params.id)
//         .then(dbRes => {
//             res.status(200).json(dbRes);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// })

// module.exports = router;
