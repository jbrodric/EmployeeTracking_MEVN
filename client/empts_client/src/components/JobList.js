import React from "react";
import { Link, useLoaderData, Form, redirect } from "react-router-dom";
import backend from "../api/backend.js";
import Datatable from "./Datatable.js";

export async function loader() {
  const jobListAPI = new backend.JobListAPI(backend.API_BASE_URL);
  const jobList = await jobListAPI.getJobListDB();
  return { jobList };
}

export async function action() {
  return redirect("/Job");
}

export default function JobList() {
  const { jobList } = useLoaderData();
  return (
    <div>
      <div>
        <h2>Available Jobs</h2>
        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
      <ul>
        {jobList && jobList.length ? (
          jobList.map((job) => (
            <li key={job._id}>
              <Link to={"/Job/" + job._id}>
                {job.title} - {job.description}
              </Link>
            </li>
          ))
        ) : (
          <p>
            <i>No Jobs</i>
          </p>
        )}
      </ul>
      <Datatable title="Available Jobs" />
    </div>
  );
}
