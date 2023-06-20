const { Router } = require("express");
const initJobPosting = require("../../../models/JobPosting");
let JobPosting;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const jobList = await JobPosting.find();
    if (!jobList) throw new Error("No Jobs found");
    res.status(200).json(jobList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const newJob = new JobPosting(req.body);
  try {
    const job = await newJob.save();
    if (!job) throw new Error("Something went wrong saving the job");
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
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
