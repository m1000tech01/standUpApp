import React, { useState } from "react";
import ButtonDashBoard from "../button-dashboard/buttonDashboard";
//import NotesService from "../services/NotesService";
import "./navBar.css";
import Icon from "@mui/material/Icon";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderModal from "../folder-dropdown/folder-modal";

const NavbarDashboard = ({ bodyClick }) => {
  const [clickNavbar, setClickNavbar] = useState(false);
  //const [folderName, setFolderName] = useState("");

  const handleNavBarOnClick = async (e) => {
    //setClickNavbar(e.target === e.currentTarget);
    if (e.target !== e.currentTarget) {
      //CHILD
      setClickNavbar(false);
      // await NotesService.createFolder(currentInputState);
      // let response = await NotesService.getNoteTreeViewStructure();
    } else {
      //PARENT
      setClickNavbar(true);
    }
  };

  return (
    <nav className="nav-bar-dashboard" onClick={(e) => handleNavBarOnClick(e)}>
      <h1>Standup App</h1>
      <div className="breadcrumb-container">
        <div className="breadcrumb">My Drive</div>
        <div className="dropdown-container" id="dropdown-container">
          <button className="dropdown">▼</button>
          {bodyClick === true ||
          (bodyClick === false && clickNavbar == true) ? (
            <></>
          ) : (
            <ul className="dropdown-elements">
              <li>
                <button
                  //onClick={(e) => handleNavDropDown(e)}
                  className="dropdown-menu-button"
                >
                  <i className="folder-items">
                    <Icon>
                      <CreateNewFolderIcon />
                    </Icon>
                  </i>
                  New folder...
                  <FolderModal />
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
