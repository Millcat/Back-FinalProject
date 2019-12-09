require("dotenv").config();
require("./config/mongo");
require("./config/passport");

const express = require("express");
const cors = require("cors");
const server = express();
const session = require("express-session");
const passport = require("passport");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("ok GO");
});

//SESSION SETTINGS
server.use(
  session({
    secret: "some secret goes here",
    resave: true,
    saveUninitialized: true
  })
);

// USE passport.initialize() and passport.session() HERE:
server.use(passport.initialize());
server.use(passport.session());

server.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  })
);

////// ROUTING
const authRouter = require("./routes/auth");
const toursRouter = require("./routes/tours");
const bookingRouter = require("./routes/booking");
// const shopCartRouter = require("./routes/shopcart");

server.use(authRouter);
server.use(toursRouter);
server.use(bookingRouter);
// server.use(shopCartRouter);

server.listen(process.env.PORT, () => {
  console.log(
    "finalproject-backend started @ http://localhost:" + process.env.PORT
  );
});
