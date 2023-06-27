const { Router } = require("express");
const initJobPosting = require("../../../models/JobPosting");

let JobPosting;
const router = Router();
const { BULK_API, ONE_API } = process.env;

/***************** Bulk API Methods *****************/
router.get(BULK_API, async (req, res) => {
  try {
    const jobList = await JobPosting.find();
    if (!jobList) throw new Error("No Jobs found");
    res.status(200).json(jobList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(BULK_API, async (req, res) => {
  const jobIdArray = req.body.Ids;
  try {
    const removed = await JobPosting.deleteMany({ _id: { $in: jobIdArray } });
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
    const jobList = await JobPosting.findOne({ _id: id }).exec();
    if (!jobList) throw new Error("No Jobs found");
    res.status(200).json(jobList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post(ONE_API, async (req, res) => {
  const newJob = new JobPosting(req.body);
  console.log(req.body);
  console.log(newJob);
  try {
    const job = await newJob.save();
    if (!job) throw new Error("Something went wrong saving the job");
    res.status(200).json(job);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put(ONE_API, async (req, res) => {
  const newJob = new JobPosting(req.body);
  try {
    newJob.isNew = false;
    const job = await newJob.save();
    if (!job) throw new Error("Something went wrong saving the job");
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(ONE_API + "/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await JobPosting.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports.JobListRoutes = router;
module.exports.initJobListModel = (mongoose) => {
  JobPosting = initJobPosting(mongoose);
};
