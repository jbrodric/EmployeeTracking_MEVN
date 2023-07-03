import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JobList, {
  loader as jobListLoader,
  action as jobListAction,
} from "./components/JobPages/JobList.js";
import Root from "./components/root.js";
import ErrorPage from "./error.js";
import Job, { loader as jobLoader } from "./components/JobPages/Job.js";
import EditJob, {
  action as editJobAction,
} from "./components/JobPages/EditJob.js";
import { action as deleteJobAction } from "./components/JobPages/DeleteJob.js";
import { action as deleteJobActionBulk } from "./components/JobPages/DeleteJobBulk.js";
import About from "./components/About.js";
import Home from "./components/Home.js";
import Applications from "./components/Applications.js";
import Candidates from "./components/Candidates.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/Jobs",
            element: <JobList />,
            loader: jobListLoader,
            action: jobListAction,
          },
          {
            path: "/Job/:jobId",
            element: <Job />,
            loader: jobLoader,
          },
          {
            path: "/Job/:jobId/edit",
            element: <EditJob />,
            loader: jobLoader,
            action: editJobAction,
          },
          {
            path: "/Job/:jobId/destroy",
            action: deleteJobAction,
          },
          {
            path: "/Jobs/destroy",
            action: deleteJobActionBulk,
          },
          {
            path: "/Job",
            element: <EditJob />,
            loader: jobLoader,
            action: editJobAction,
          },
          {
            path: "/About",
            element: <About />,
          },
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/Applications",
            element: <Applications />,
          },
          {
            path: "/Candidates",
            element: <Candidates />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;
