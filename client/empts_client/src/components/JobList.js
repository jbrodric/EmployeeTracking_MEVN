import React, { useEffect, useState } from "react";
import backend from "../api/backend.js";

const jobListAPI = new backend.JobListAPI(backend.API_BASE_URL);

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const fetchedJobs = await jobListAPI.getJobListDB();
      setJobs(fetchedJobs);
      console.log(fetchedJobs);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <a href={"/Job/" + job._id}>
              {job.title} - {job.description}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
