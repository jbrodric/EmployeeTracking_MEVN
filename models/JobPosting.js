module.exports = (mongoose) => {
  const JobPostingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

  return mongoose.model("jobposting", JobPostingSchema);
};
