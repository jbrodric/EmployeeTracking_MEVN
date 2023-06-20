import React, { useEffect, useState } from "react";
import backend from "../api/backend.js";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const jobList = new backend.JobListAPI(backend.API_BASE_URL);

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await jobList.getJobListDB();
      setJobs(fetchedJobs);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
