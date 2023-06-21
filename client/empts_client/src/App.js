import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JobList from "./components/JobList.js";
import Root from "./components/root.js";
import ErrorPage from "./error.js";
import Job from "./components/Job.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/Jobs",
        element: <JobList />,
      },
      {
        path: "/Job/:jobId",
        element: <Job />,
      },
      {
        path: "/Job",
        element: <Job />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
