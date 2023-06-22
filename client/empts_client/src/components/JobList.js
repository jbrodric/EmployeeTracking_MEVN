import React from "react";
import { Link, useLoaderData, Form, redirect } from "react-router-dom";
import backend from "../api/backend.js";
import Datatable, { DataModel } from "./Datatable.js";

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

  const rows = [
    {
      name: "Cupcake1",
      calories: 1,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: "Cupcake2",
      calories: 2,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: "Cupcake3",
      calories: 3,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: "Cupcake4",
      calories: 4,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: "Cupcake5",
      calories: 5,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: "Cupcake6",
      calories: 6,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: "Cupcake7",
      calories: 7,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: "Cupcake8",
      calories: 8,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
    {
      name: "Cupcake9",
      calories: 9,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
    },
  ];

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Dessert (100g serving)",
    },
    {
      id: "calories",
      numeric: true,
      disablePadding: false,
      label: "Calories",
    },
    {
      id: "fat",
      numeric: true,
      disablePadding: false,
      label: "Fat (g)",
    },
    {
      id: "carbs",
      numeric: true,
      disablePadding: false,
      label: "Carbs (g)",
    },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: "Protein (g)",
    },
  ];

  const data = new DataModel(rows, headCells);

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
      <Datatable title="Available Jobs" data={data} columnData={headCells} />
    </div>
  );
}
