const express = require("express");
const authRouter = express.Router();
const uploader = require("./../config/cloudinary");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userModel = require("../models/User");

// SIGN UP ROUTE : TESTED WITH POSTMAN => OK !!! Login afier doesn't work
authRouter.post("/signup", uploader.single("tourPicture"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes."
    });
    return;
  }

  userModel.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  userModel
    .create(req.body, (req.body.password = hashPass))
    .then(dbRes => {
      res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      res.status(400).json(dbErr);
    });

  // Automatically log in user after sign up
  req.login(User => {
    User.findById(req.params.id, req.body, { new: true })
      .then(dbRes => {
        res.status(200).json(dbRes);
      })
      .catch(dbRes => {
        res.status(500).json(dbRes);
      });
  });
});

// LOGIN ROUTE
authRouter.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

//LOG OUT ROUTE
authRouter.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRouter.get("/signin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = authRouter;
