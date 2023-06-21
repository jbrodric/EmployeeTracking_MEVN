import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Outlet, Link } from "react-router-dom";

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
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/Jobs`}>Jobs</Link>
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
