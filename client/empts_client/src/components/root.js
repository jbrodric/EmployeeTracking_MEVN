import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div id="sidebar">
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
              <a href={`/`}>Home</a>
            </li>
            <li>
              <a href={`/Jobs`}>Jobs</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
