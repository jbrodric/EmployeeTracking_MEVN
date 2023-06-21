import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JobList, {
  loader as jobListLoader,
  action as jobListAction,
} from "./components/JobList.js";
import Root from "./components/root.js";
import ErrorPage from "./error.js";
import Job, { loader as jobLoader } from "./components/Job.js";
import EditJob, { action as editJobAction } from "./components/EditJob.js";
import { action as deleteJobAction } from "./components/DeleteJob.js";

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
            path: "/Job",
            element: <EditJob />,
            loader: jobLoader,
            action: editJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
