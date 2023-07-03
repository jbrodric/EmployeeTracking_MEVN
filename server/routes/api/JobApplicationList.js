const { Router } = require("express");
const {
  initJobApplication,
  getJobApplicationSchema,
} = require("../../../models/JobApplication");

let JobApplication;
const router = Router();
const { BULK_API, ONE_API, SCHEMA_API } = process.env;

/***************** Schema API Methods *****************/
router.get(SCHEMA_API + "/", async (req, res) => {
  try {
    res.status(200).json(getJobApplicationSchema().obj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/***************** Bulk API Methods *****************/
router.get(BULK_API, async (req, res) => {
  try {
    const jobApplicationList = await JobApplication.find();
    if (!jobApplicationList) throw new Error("No Job Applications found");
    res.status(200).json(jobApplicationList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(BULK_API, async (req, res) => {
  const jobApplicationIdArray = req.body.Ids;
  try {
    const removed = await JobApplication.deleteMany({
      _id: { $in: jobApplicationIdArray },
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
    const jobApplication = await JobApplication.findOne({ _id: id }).exec();
    if (!jobApplication) throw new Error("No Job Applications found");
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(ONE_API, async (req, res) => {
  for (prop in req.body) if (req.body[prop] === "") req.body[prop] = undefined; // This will blank in db
  const newJobApplication = new JobApplication(req.body);
  try {
    const jobApplication = await newJobApplication.save();
    if (!jobApplication)
      throw new Error("Something went wrong saving the job application");
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(ONE_API, async (req, res) => {
  for (prop in req.body) if (req.body[prop] === "") req.body[prop] = undefined; // This will blank in db
  const newJobApplication = new JobApplication(req.body);
  try {
    newJobApplication.isNew = false;
    const jobApplication = await newJobApplication.save();
    if (!jobApplication)
      throw new Error("Something went wrong saving the job application");
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(ONE_API + "/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await JobApplication.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports.JobApplicationListRoutes = router;
module.exports.initJobApplicationListModel = (mongoose) => {
  JobApplication = initJobApplication(mongoose);
};
