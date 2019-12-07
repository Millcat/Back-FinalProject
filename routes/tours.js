const express = require("express");
const router = new express.Router();
const tourModel = require("./../models/Tour");
const uploader = require("./../config/cloudinary");

//tested with POSTMAN => OK
router.get("/tours", (req, res) => {
  tourModel
    .find()
    .populate("users")
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
      console.log(dbErr)
    });
});

// tested with POSTMAN => OK
router.get("/tours/:id", (req, res) => {
  tourModel
    .findById(req.params.id)
    .populate("bookings")
    .populate("users")
    .then(dbRes => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(500).json(dbErr);
    });
});

// add protectUserRoute before uploader.single
// tested with POSTMAN => OK
router.post("/tours",
  uploader.single("tourPicture"), (req, res) => {
    if (req.file) req.body.tourPicture = req.file.secure_url;
    // console.log(req.file)

    const newTour = {
      ...req.body,
      languages: req.body.languages.split(',')
    };

    tourModel
      .create(newTour)
      .then(dbRes => {
        res.status(200).json(dbRes);
      })
      .catch(dbErr => {
        console.log(dbErr)
        res.status(500).json(dbErr);
      });
  });

// tested with POSTMAN => no error but no update..
router.patch("/tours/:id", (req, res) => {
  tourModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

// tested with POSTMAN => OK
router.delete("/tours/:id", (req, res) => {
  tourModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

module.exports = router;
