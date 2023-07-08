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
const { initRecordListModel } = require("./routes/api/RecordList");
const { initJobPosting, getJobPostingSchema } = require("../models/JobPosting");
const { initCandidate, getCandidateSchema } = require("../models/Candidate");
const {
  initJobApplication,
  getJobApplicationSchema,
} = require("../models/JobApplication");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB database Connected...");

    app.use(cors()); // to allow cross origin requests
    app.use(bodyParser.json()); // to convert the request into JSON
    initAPIRoutes(app);
    app.listen(process.env.PORT, () =>
      console.log(
        `App listening at ${process.env.API_BASE_URL}:${process.env.PORT}`
      )
    );
  })
  .catch((err) => console.log(err));

function initAPIRoutes(app) {
  app.use(
    process.env.API_JOB_LIST_PATH,
    initRecordListModel(mongoose, initJobPosting, getJobPostingSchema, "Job")
  );
  app.use(
    process.env.API_CANDIDATE_LIST_PATH,
    initRecordListModel(
      mongoose,
      initCandidate,
      getCandidateSchema,
      "Candidate"
    )
  );
  app.use(
    process.env.API_JOB_APP_LIST_PATH,
    initRecordListModel(
      mongoose,
      initJobApplication,
      getJobApplicationSchema,
      "Job Application"
    )
  );
}
