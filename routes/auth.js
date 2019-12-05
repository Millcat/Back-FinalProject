const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");
// var bcrypt = require("bcryptjs");
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0//", salt);
const uploader = require("./../config/cloudinary");

router.get("/signup", (req, res) => {
  res.render("auth/signup", {});
});

router.post("/signup", uploader.single("userPicture"), (req, res, next) => {
  const newUser = req.body;
  if (req.file) {
    newUser.userPicture = req.file.secure_url;
  }

  userModel
    .findOne({
      email: newUser.email
    })
    .then(user => {
      if (user !== null) {
        res.redirect("/inspire-me");
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashed = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashed;
      userModel
        .create(newUser)
        .then(userRes => {
          req.session.currentUser = userRes;
          res.redirect("/inspire-me");
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

router.post("/signin", (req, res) => {
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  userModel
    .findOne({ email: theEmail })
    .then(user => {
      if (!user) {
        req.flash("error", "Wrong credentials");
        res.redirect("/auth/signin");
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/inspire-me");
      } else {
        res.redirect("/signin", {
          // msg: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    res.locals.isLoggedIn = false;
    res.redirect("/auth/signin");
  });
});

module.exports = router;
