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
    active: {
      type: Boolean,
    },
    numberOfEmployees: {
      type: Number,
    },
    type: {
      type: String,
    },
    qualification1: {
      type: String,
    },
    qualification2: {
      type: String,
    },
    qualification3: {
      type: String,
    },
    qualification4: {
      type: String,
    },
  });

  return mongoose.model("jobposting", JobPostingSchema);
};

module.exports.getJobPostingSchema = () => JobPostingSchema;
