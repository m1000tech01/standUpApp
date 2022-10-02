import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import GmailTreeView from "../components/googleStyleTreeView/GoogleStyleTreeView";
import AvatarChip from "../components/googleStyleNewButton/GoogleStyleNewButton";
import NotesService from "../services/NotesService";
import NotesContainer from "../components/notes-container/NotesContainer";

export default function GoogleDriveDashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
    <div className="google-dashboard-container">
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item p={2} xs={12} md={12}>
          <Item>Top Bar</Item>
        </Grid>
        <Grid container md={2}>
          <Grid container p={3}>
            <Grid sx={{ pl: 1 }}>
              <AvatarChip />
            </Grid>
          </Grid>
          <Grid container>
            <Grid>
              <GmailTreeView />
            </Grid>
          </Grid>
        </Grid>
        <Grid container p={2} md={10}>
          {notesContainerData.length > 0 ? (
            <NotesContainer
              data={notesContainerData}
              parentCallBack={callBack}
            />
          ) : (
            <></>
          )}
        </Grid>
        <Grid item p={2} xs={12} md={12}>
          <Item>Footer</Item>
        </Grid>
      </Grid>
    </div>
  );
}
