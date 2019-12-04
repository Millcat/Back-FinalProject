require("dotenv").config();
require("./config/mongo");

const express = require("express");
const cors = require("cors");
const server = express();

server.use(express.json());

server.use(cors("*"));


server.get("/", (req, res) => {
    res.send("ok GO");
});

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
    console.log("finalproject-backend started @ http://localhost:" + process.env.PORT)
});

