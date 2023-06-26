import React from "react";
import { Paper } from "@mui/material";

export default function About() {
  return (
    <Paper variant="elevation" elevation={8} className="page">
      <div>
        <h2>About</h2>
        <p>
          <i>Employee Tracking System is powered by:</i>
        </p>
        <ul>
          <li>MongoDB</li>
          <li>Express.js</li>
          <li>React</li>
          <li>Node.js</li>
          <li>Material UI</li>
        </ul>
      </div>
    </Paper>
  );
}
