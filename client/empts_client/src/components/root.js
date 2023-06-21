import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Outlet, useNavigation, NavLink } from "react-router-dom";

export default function Root() {
  const navigation = useNavigation();

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
          </ul>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
