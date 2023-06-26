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
      required: true,
    },
  });

  return mongoose.model("jobposting", JobPostingSchema);
};
