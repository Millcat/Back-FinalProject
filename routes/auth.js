const express = require("express");
const authRouter = express.Router();
const uploader = require("./../config/cloudinary");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userModel = require("../models/User");

// SIGN UP ROUTE : TESTED WITH POSTMAN => OK !!! Login after doesn't work
authRouter.post("/signup", uploader.single("userPicture"), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  if (password.length < 4) {
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

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    req.body.password = hashPass;
    if (req.file) req.body.userPicture = req.file.secure_url;

    userModel
      .create(req.body)
      .catch(dbErr => res.status(400).json(dbErr))
      .then(user => {
        // Automatically log in user after sign up
        req.login(user, () => res.status(200).json(req.user));
      })
      .catch(dbRes => res.status(500).json(dbRes));
  });
});

// LOGIN ROUTE => OK ON POSTMAN
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
      console.log(req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRouter.get("/user/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate("tours");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOG OUT ROUTE => OK ON POSTMAN
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

authRouter.use("/is-loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    // method provided by passport
    const { _id, userPicture, username, age, email, password, description } = req.user;
    return res.status(200).json({
      currentUser: {
        _id,
        userPicture,
        username,
        age,
        email,
        password,
        description
      }
    });
  }
  res.status(403).json("Unauthorized");
});

module.exports = authRouter;
