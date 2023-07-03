const { Router } = require("express");
const {
  initCandidate,
  getCandidateSchema,
} = require("../../../models/Candidate");

let Candidate;
const router = Router();
const { BULK_API, ONE_API, SCHEMA_API } = process.env;

/***************** Schema API Methods *****************/
router.get(SCHEMA_API + "/", async (req, res) => {
  try {
    res.status(200).json(getCandidateSchema().obj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/***************** Bulk API Methods *****************/
router.get(BULK_API, async (req, res) => {
  try {
    const candidateList = await Candidate.find();
    if (!candidateList) throw new Error("No Candidates found");
    res.status(200).json(candidateList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(BULK_API, async (req, res) => {
  const candidateIdArray = req.body.Ids;
  try {
    const removed = await Candidate.deleteMany({
      _id: { $in: candidateIdArray },
    });
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/***************** One API Methods *****************/
router.get(ONE_API + "/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const candidate = await Candidate.findOne({ _id: id }).exec();
    if (!candidate) throw new Error("No Candidate found");
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(ONE_API, async (req, res) => {
  for (prop in req.body) if (req.body[prop] === "") req.body[prop] = undefined; // This will blank in db
  const newCandidate = new Candidate(req.body);
  try {
    const candidate = await newCandidate.save();
    if (!candidate)
      throw new Error("Something went wrong saving the Candidate");
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(ONE_API, async (req, res) => {
  for (prop in req.body) if (req.body[prop] === "") req.body[prop] = undefined; // This will blank in db
  const newCandidate = new Candidate(req.body);
  try {
    newCandidate.isNew = false;
    const candidate = await newCandidate.save();
    if (!candidate)
      throw new Error("Something went wrong saving the Candidate");
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(ONE_API + "/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Candidate.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports.CandidateListRoutes = router;
module.exports.initCandidateListModel = (mongoose) => {
  Candidate = initCandidate(mongoose);
};
