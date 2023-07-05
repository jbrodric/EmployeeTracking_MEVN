let CandidateSchema;

module.exports.initCandidate = (mongoose) => {
  CandidateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
    },
    yearsExperience: {
      type: Number,
    },
  });

  return mongoose.model("candidate", CandidateSchema);
};

module.exports.getCandidateSchema = () => CandidateSchema;
