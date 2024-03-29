import React, { useState, useEffect, useCallback } from "react";
import Button from "../components/button/button";
import NotesService from "../services/NotesService";
import { useHistory } from "react-router-dom";
import FileTree from "../components/filetree/FileTree";
import NavbarDashboard from "../components/navbarDashboard/NavbarDashboard";
import TextField from "@mui/material/TextField";
import NotesContainer from "../components/notes-container/NotesContainer";
import CardThumbnail from "../components/card-thumbnail/CardThumbnail";
import Grid from "@mui/material/Grid";
import "./dashboard.css";

//Todo: Breadcrumb/Tree view finder for pages.

export default function Dashboard() {
  const [currentData, setCurrentDataState] = useState([]);
  const [bodyClick, setBodyClick] = useState(true);
  const [currentInputState, setCurrentInputState] = useState("");
  const [currentTreeViewData, setCurrentTreeViewData] = useState([]);
  const [currentTreeViewDataLoaded, setCurrentTreeViewDataLoaded] =
    useState(false);
  const [createNewButtonInFolder, setCreateNewButtonInFolder] = useState(true);
  const [currentFolderName, setCurrentFolderName] = useState("");
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [value, setValue] = useState("");
  const [notesContainerData, setNotesContainerData] = useState("");
  const [currentContainerDataLoaded, setCurrentContainerDataLoaded] =
    useState(false);

  const [noteReloaded, setNoteReloaded] = useState(false);

  //create Collapse button data
  const [collapseAll, setCollapseAll] = useState(false);
  const handleCollapseAll = (value) => setCollapseAll(value);

  //Create file action data*
  const handleFileOnClick = (file) => {
    currentTreeViewData.child.forEach((folder) => {
      folder.child.forEach((note) => {
        if (file.name === note.name && file.id === note.id) {
          setCurrentFolderName(folder);
          setCurrentFolderId(folder.id);
        }
      });
    });
    //setCurrentFolderName(file);
    setCreateNewButtonInFolder(true);
  };

  const onNavBarClick = (e) => {
    setBodyClick(false);
  };

  const action = {
    fileOnClick: handleFileOnClick,
  };

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

  //Create Decoration data*
  const treeDecorator = {
    showIcon: true,
    iconSize: 18,
    textSize: 15,
    showCollapseAll: true,
  };

  // Using useEffect to call the API once mounted and set the data
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
  useEffect(() => {
    async function getFileTreeview() {
      let response = await NotesService.getNoteTreeViewStructure();
      setCurrentTreeViewData(response);
      //setCurrentTreeViewData(data);
      setCurrentTreeViewDataLoaded(true);
      console.log(response);
      //console.log(data);
      console.log("this is the current tree view data" + currentTreeViewData);
    }
    getFileTreeview();
  }, []);

  const handleClickedRow = (e, id) => {
    const win = window.open("/writingpage/" + id, "_blank");
    win.focus();
  };

  const handleCreateFolder = async () => {
    await NotesService.createFolder(currentInputState);
    let response = await NotesService.getNoteTreeViewStructure();
    setCurrentTreeViewData(response);
  };

  const handleCreateNewNoteInFolder = async () => {
    let model = {
      id: 0,
      text: "welcome to your note",
      folder: currentTreeViewData,
    };
    let noteId = await NotesService.addorUpdate(model);
    console.log(noteId);
    const win = window.open("/writingpage/" + noteId, "_blank");
    win.focus();
  };

  //TODO: Have button dashboard, so that we can open writing page if there is no data
  //in the database.
  const handleGoToWritingPage = async () => {
    let folderid = parseInt(currentFolderId);
    let model = {
      id: 0,
      text: "welcome to your note",
      folderId: folderid,
    };
    let noteId = await NotesService.addorUpdate(model);
    console.log("hello we are in the handleGoToWritingPage function ");
    const win = window.open("/writingpage/" + noteId, "_blank");
    win.focus();
  };

  const handleOnBodyClick = async () => {
    setBodyClick(true);
  };

  <td onClick={() => window.open("someLink", "_blank")}>text</td>;
  return (
    <div>
      <Grid container spacing={1}>
        <div onClick={(e) => onNavBarClick(e)}>
          <NavbarDashboard bodyClick={bodyClick} />
        </div>
        <div className="dashboard-body" onClick={(e) => handleOnBodyClick(e)}>
          <div className="thumbnail-fileTree-container">
            <div className="fileTree-container">
              <button onClick={() => setCollapseAll(true)}>Collapse All</button>
              {currentTreeViewDataLoaded === true ? (
                <FileTree
                  data={currentTreeViewData}
                  action={action} //optional
                  collapseAll={{ collapseAll, handleCollapseAll }} //Optional
                  decorator={treeDecorator} //Optional
                  onClick={(e) => handleFileOnClick(e)}
                />
              ) : (
                "loading"
              )}
            </div>
            <div className="thumbnail-container">
              <NotesContainer data={currentTreeViewData} />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            {currentData === undefined ? (
              "loading..."
            ) : (
              <div className="container">
                <h1>Current Files</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Text</th>
                      <th>Author</th>
                      <th>Label</th>
                      <th>Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((note) => (
                      <tr
                        key={note.id}
                        onClick={(e) => handleClickedRow(e, note.id)}
                      >
                        <td>{note.text}</td>
                        <td>{note.author}</td>
                        <td>
                          {note.labels.map((l) => (
                            <span>{l.labelText + ","}</span>
                          ))}
                        </td>
                        <td>{note.modificationDate}</td>
                        <td />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {notesContainerData.length > 0 ? (
            <NotesContainer
              data={notesContainerData}
              parentCallBack={callBack}
            />
          ) : (
            <></>
          )}
        </div>
      </Grid>
    </div>
  );
}
