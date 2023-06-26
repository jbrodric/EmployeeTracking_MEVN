import React from "react";
import { useLoaderData, Form, redirect } from "react-router-dom";
import backend from "../api/backend.js";
import Datatable, { DataModel } from "./Datatable.js";
import { Paper } from "@mui/material";

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
  const data = new DataModel(jobList, [
    {
      id: "title",
      numeric: false,
      type: "text",
      disablePadding: true,
      label: "Title",
    },
    {
      id: "description",
      numeric: false,
      type: "text",
      disablePadding: false,
      label: "Description",
    },
  ]);

  return (
    <Paper variant="elevation" elevation={8} className="page">
      <div>
        <div>
          <h2>Available Jobs</h2>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <Datatable
          title="Available Jobs"
          data={data}
          recordURL="/Job/"
          recordIdField="_id"
        />
      </div>
    </Paper>
  );
}
