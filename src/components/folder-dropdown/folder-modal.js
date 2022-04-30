import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonDashBoard from "../button-dashboard/buttonDashboard";
import "./folder-modal.css";

const FolderModal = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}></Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
            <TextField
              variant="outlined"
              color="secondary"
              hiddenLabel
              fullWidth
              label="Folder Name"
              id="margin-none"
              margin="normal"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonDashBoard text="Cancel" className="modal-button-left" />
          <ButtonDashBoard text="Create" className="modal-button-right" />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FolderModal;
