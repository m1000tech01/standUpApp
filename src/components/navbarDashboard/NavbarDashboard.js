import React, { useState } from "react";
import ButtonDashBoard from "../button-dashboard/buttonDashboard";
import NotesService from "../../services/NotesService";
import "./navBar.css";
import Icon from "@mui/material/Icon";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderModal from "../folder-dropdown/folder-modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const NavbarDashboard = ({ bodyClick }) => {
  const [clickNavbar, setClickNavbar] = useState(false);
  const [clickNewButton, setClickNewButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderName2, setFolderName2] = useState();

  const handleNavBarOnClick = async (e) => {
    //setClickNavbar(e.target === e.currentTarget);
    if (e.target !== e.currentTarget) {
      //CHILD
      setClickNavbar(false);
      console.log("getting event " + e);

      // await NotesService.createFolder(currentInputState);
      // let response = await NotesService.getNoteTreeViewStructure();
    } else {
      //PARENT
      setClickNavbar(true);
    }
  };

  const handleNewButtonClick = (e) => {
    console.log("getting here handleNewButtonClick " + clickNewButton);
    setClickNewButton(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    setOpen(false);
    await NotesService.createFolder(folderName);
  };

  const handleSetFolderName = (e) => {
    let newfolderName = e.target.value;
    e.stopPropagation();
    e.preventDefault();
    setFolderName(newfolderName);
    console.log(folderName);
  };

  const ModalDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <form>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
              {/* <TextField
                variant="outlined"
                color="secondary"
                hiddenLabel
                fullWidth
                label="Folder Name"
                id="margin-none"
                // value={folderName}
                margin="normal"
                onChange={}
              /> */}
              <input
                type="text"
                value={folderName}
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
              ></input>
            </form>
          </DialogContent>
          <DialogActions>
            <ButtonDashBoard
              text="Cancel"
              className="modal-button-left"
              onClick={handleClose}
            />
            <ButtonDashBoard
              text="Create"
              className="modal-button-right"
              onClick={handleCreate}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <nav className="nav-bar-dashboard">
      <h1>Standup App</h1>
      <div className="breadcrumb-container">
        <div>{open === true ? <ModalDialog /> : <></>}</div>
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
                  <div onClick={handleClickOpen}>
                    <i className="folder-items">
                      <Icon>
                        <CreateNewFolderIcon />
                      </Icon>
                    </i>
                    New folder...
                  </div>
                  <div>{open === true ? <ModalDialog /> : <></>}</div>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      <ButtonDashBoard text="NEW" onClick={(e) => handleClickOpen(e)} />
    </nav>
  );
};

export default NavbarDashboard;
