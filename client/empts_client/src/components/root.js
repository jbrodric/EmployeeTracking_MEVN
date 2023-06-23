import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Outlet, useNavigation, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";

export default function Root() {
  const navigation = useNavigation();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid xs={12} id="header">
            <p>Employee Tracking System</p>
          </Grid>
          <Grid xs={12} md={2} id="sidebar">
            <div id="logo">
              <FontAwesomeIcon
                icon={icon({ name: "folder-open", style: "solid" })}
              />
              <span style={{ margin: "5px" }}></span>
              <h1>Employee Tracking System</h1>
            </div>
            <nav>
              <ul>
                <li>
                  <NavLink
                    to={`/`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/Jobs`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`/About`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    About
                  </NavLink>
                </li>
              </ul>
            </nav>
          </Grid>
          <Grid
            xs={12}
            md={10}
            id="detail"
            className={navigation.state === "loading" ? "loading" : ""}
          >
            <div id="outlet">
              <Outlet />
            </div>
          </Grid>
          <Grid xs={12} id="footer">
            <p>
              <i>Employee Tracking System ©2023</i>
            </p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
