let JobApplicationSchema;

module.exports.initJobApplication = (mongoose) => {
  JobApplicationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    jobPostingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobposting",
      required: true,
    },
    desiredSalary: {
      type: mongoose.Schema.Types.Decimal128,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "candidate",
      required: true,
    },
  });

  return mongoose.model("jobapplication", JobApplicationSchema);
};

module.exports.getJobApplicationSchema = () => JobApplicationSchema;
