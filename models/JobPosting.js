module.exports = (mongoose) => {
  const JobPostingSchema = new mongoose.Schema({
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
  });

  return mongoose.model("jobposting", JobPostingSchema);
};
