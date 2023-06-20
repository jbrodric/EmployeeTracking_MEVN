import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JobList from "./components/JobList.js";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={JobList} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
