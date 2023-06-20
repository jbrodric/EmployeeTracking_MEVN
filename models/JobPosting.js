const { Schema, model } = require("mongoose");

const JobPostingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const JobPosting = model("jobposting", JobPostingSchema);

module.exports = JobPosting;
