const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(ok => console.log("connected to mongodb"))
  .catch(err => console.log("mongodb connection error", err));
