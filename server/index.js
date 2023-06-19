const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const mongoose = require("mongoose");
const { PORT, mongoUri } = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors()); // to allow cross origin requests
app.use(bodyParser.json()); // to convert the request into JSON

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);
