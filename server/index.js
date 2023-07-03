const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  PORT,
  MONGO_URI,
  API_BASE_URL,
  API_JOB_LIST_PATH,
  API_JOB_APP_LIST_PATH,
  API_CANDIDATE_LIST_PATH,
} = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { JobListRoutes, initJobListModel } = require("./routes/api/JobList");
const {
  JobApplicationListRoutes,
  initJobApplicationListModel,
} = require("./routes/api/JobApplicationList");
const {
  CandidateListRoutes,
  initCandidateListModel,
} = require("./routes/api/CandidateList");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database Connected...");

    initModel();

    app.use(cors()); // to allow cross origin requests
    app.use(bodyParser.json()); // to convert the request into JSON
    app.use(process.env.API_JOB_LIST_PATH, JobListRoutes);
    app.use(process.env.API_JOB_APP_LIST_PATH, JobApplicationListRoutes);
    app.use(process.env.API_CANDIDATE_LIST_PATH, CandidateListRoutes);
    app.listen(process.env.PORT, () =>
      console.log(
        `App listening at ${process.env.API_BASE_URL}:${process.env.PORT}`
      )
    );
  })
  .catch((err) => console.log(err));

function initModel() {
  initJobListModel(mongoose);
  initJobApplicationListModel(mongoose);
  initCandidateListModel(mongoose);
}
