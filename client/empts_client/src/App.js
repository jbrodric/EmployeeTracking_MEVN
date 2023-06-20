import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./components/JobList.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
