import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import backend from "../api/backend.js";
import Datatable, { DataModel } from "./Datatable.js";
import { StdJobListView } from "../listViews/JobListView.js";

export async function loader() {
  const jobListAPI = new backend.JobListAPI();
  const jobList = await jobListAPI.getJobListDB();
  return { jobList };
}

export async function action() {
  return redirect("/Job");
}

export default function JobList() {
  const { jobList } = useLoaderData();
  const data = new DataModel(jobList, StdJobListView());

  return (
    <Datatable
      title="Jobs"
      data={data}
      recordURL="/Job/"
      recordIdField="_id"
      useDense={true}
    />
  );
}
