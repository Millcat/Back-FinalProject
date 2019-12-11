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
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  })
);

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

// USE passport.initialize() and passport.session() HERE:
server.use(passport.initialize());
server.use(passport.session());


////// ROUTING
const authRouter = require("./routes/auth");
const toursRouter = require("./routes/tours");
const bookingRouter = require("./routes/booking");

server.use(authRouter);
server.use(toursRouter);
server.use(bookingRouter);

server.listen(process.env.PORT, () => {
  console.log(`
    yay ! app is ready:
    -------->
    backend server runs @ : http://localhost:${process.env.PORT}
    -------->
    client server runs @ : ${process.env.FRONTEND_URL}
  `);
});