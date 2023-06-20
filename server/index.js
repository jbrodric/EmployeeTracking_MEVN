const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { JobListRoutes, initJobListModel } = require("./routes/api/JobList");
const path = require("path");

app.use(cors()); // to allow cross origin requests
app.use(bodyParser.json()); // to convert the request into JSON

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database Connected...");

    initJobListModel(mongoose);
    app.use("/api/JobList", JobListRoutes);

    app.listen(process.env.PORT, () =>
      console.log(`App listening at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
