import React, { useState } from "react";
import ButtonDashBoard from "../button-dashboard/buttonDashboard";
import "./navBar.css";

const NavbarDashboard = ({ bodyClick }) => {
  const [displayFolder, setDisplayFolder] = useState(true);

  const handleDisplayCreateNewFolders = () => {
    setDisplayFolder(!displayFolder);
    console.log("getting here + ", displayFolder);
  };

  return (
    <nav className="nav-bar-dashboard">
      <h1>Standup App</h1>
      <div className="breadcrumb-container">
        <div className="breadcrumb">My Drive</div>
        <div
          className="dropdown-container"
          onClick={(e) => handleDisplayCreateNewFolders(e)}
        >
          <button className="dropdown">▼</button>
          {!bodyClick && displayFolder ? (
            <></>
          ) : (
            <ul class="dropdown-elements">
              <li>
                <button>
                  <i class="folder-items">create_new_folder</i>New folder...
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <ButtonDashBoard text="NEW" />
    </nav>
  );
};

export default NavbarDashboard;
