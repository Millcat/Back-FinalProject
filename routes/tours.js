const express = require("express");
const router = new express.Router();
const tourModel = require("./../models/Tour");

//tested with POSTMAN => OK
router.get("/tours", (req, res) => {
    tourModel
        .find()
        .then(dbRes => {
            res.status(200).json(dbRes);
        })
        .catch(dbErr => {
            res.status(500).json(dbErr);
        });
});

// tested with POSTMAN => OK
router.get("/tours/:id", (req, res) => {
    tourModel
        .findById(req.params.id)
        .then(dbRes => {
            res.status(200).json(dbRes);
        })
        .catch(dbErr => {
            res.status(500).json(dbErr);
        });
});

// tested with POSTMAN => OK
router.post("/tours", (req, res) => {
    tourModel
        .create(req.body)
        .then(dbRes => {
            res.status(200).json(dbRes);
        })
        .catch(dbErr => {
            res.status(500).json(dbErr);
        });
});

// tested with POSTMAN => no error but no update..
router.patch("/tours/:id", (req, res) => {
    tourModel
        .findByIdAndUpdate(req.params.id)
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