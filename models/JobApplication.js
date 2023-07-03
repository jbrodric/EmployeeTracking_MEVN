let JobApplicationSchema;

module.exports.initJobApplication = (mongoose) => {
  JobApplicationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    jobPostingId: {
      type: "ObjectId",
      required: true,
    },
    desiredSalary: {
      type: mongoose.Schema.Types.Decimal128,
    },
    candidateId: {
      type: "ObjectId",
      required: true,
    },
  });

  return mongoose.model("jobapplication", JobApplicationSchema);
};

module.exports.getJobApplicationSchema = () => JobApplicationSchema;
