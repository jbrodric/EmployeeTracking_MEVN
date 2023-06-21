import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import JobList from "./components/JobList.js";
import Root from "./components/root.js";
import ErrorPage from "./error.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}>
      <Routes>
        <Route path="/Jobs" element={<JobList />} />
      </Routes>
    </RouterProvider>
  );
};

export default App;
