import React, { useState, useEffect, useCallback } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import GmailTreeView from "../components/googleStyleTreeView/GoogleStyleTreeView";
import NotesService from "../services/NotesService";
import NotesContainer from "../components/notes-container/NotesContainer";
import AvatarChip from "../components/googleStyleNewButton/GoogleStyleNewButton";

export default function NewGoogleDriveDashboard() {
  const [notesContainerData, setNotesContainerData] = useState("");
  const [noteReloaded, setNoteReloaded] = useState(false);
  const [currentData, setCurrentDataState] = useState([]);

  useEffect(() => {
    async function getNotes() {
      if (!noteReloaded) {
        setNoteReloaded(true);
        let response = await NotesService.getAll();
        setCurrentDataState(response);
        setNotesContainerData(response);
        //setCurrentContainerDataLoaded(true);
        console.log(response);
      }
    }
    getNotes();
  }, [currentData, notesContainerData, noteReloaded]);

  const callBack = useCallback(
    async (id) => {
      let response = await NotesService.deleteNoteById(id);
      if (response === true) {
        setNoteReloaded(false);
      }
      console.log(response + " arriving here for deletion");
    },
    [noteReloaded]
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={4}>
          <Grid sx={{ pl: 5, pt: 3 }}>
            <AvatarChip />
          </Grid>
          <Grid>
            <Button>
              <GmailTreeView />
            </Button>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={8} spacing={2}>
          <Grid item>
            {notesContainerData.length > 0 ? (
              <NotesContainer
                data={notesContainerData}
                parentCallBack={callBack}
              />
            ) : (
              <></>
            )}
          </Grid>
          <Grid item>
            <Paper style={{ height: "49vh", background: "green" }} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
