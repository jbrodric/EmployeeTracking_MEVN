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
      type: mongoose.Schema.Types.Decimal128,
    },
  });

  return mongoose.model("candidate", CandidateSchema);
};

module.exports.getCandidateSchema = () => CandidateSchema;
