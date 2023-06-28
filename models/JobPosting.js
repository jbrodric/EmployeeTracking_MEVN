let JobPostingSchema;

module.exports.initJobPosting = (mongoose) => {
  JobPostingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dateOpened: {
      type: Date,
    },
    minSalary: {
      type: mongoose.Schema.Types.Decimal128,
    },
    maxSalary: {
      type: mongoose.Schema.Types.Decimal128,
    },
  });

  return mongoose.model("jobposting", JobPostingSchema);
};

module.exports.getJobPostingSchema = () => JobPostingSchema;
