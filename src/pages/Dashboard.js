import React, { useState, useEffect } from "react";
import Button from "../components/button/button";
import NotesService from "../services/NotesService";
import { useHistory } from "react-router-dom";
import FileTree from "react-file-treeview";

//Todo: Breadcrumb/Tree view finder for pages.

export default function Dashboard() {
  const [currentData, setCurrentDataState] = useState([]);
  const [currentInputState, setCurrentInputState] = useState("");
  const [currentTreeViewData, setCurrentTreeViewData] = useState([]);
  const [currentTreeViewDataLoaded, setCurrentTreeViewDataLoaded] =
    useState(false);
  const [createNewButtonInFolder, setCreateNewButtonInFolder] = useState(false);
  const [currentFolderName, setCurrentFolderName] = useState("");

  const data = {
    name: "treeview",
    id: 1,
    toggled: true,
    child: [
      {
        name: "folder1",
        id: 2,
        test: "test",
        number: 3,
        child: [
          {
            name: "folder2",
            id: 5,
            child: [
              { name: "file3.py", id: 6, child: [] },
              { name: "file4.cpp", id: 7, child: [] },
            ],
          },
          { name: "file1.js", id: 3, child: [] },
          { name: "file2.ts", id: 4, child: [] },
        ],
      },
    ],
  };
  const dataString = {
    name: "notes",
    id: 0,
    toggled: true,
    child: [
      { name: "637711823070187860", id: 8, child: [] },
      { name: "637723898039536030", id: 9, child: [] },
      { name: "637723898039536030", id: 10, child: [] },
      { name: "637729945917641250", id: 11, child: [] },
    ],
  };

  const dataString2 = JSON.parse(
    '{"name":"notes","id":0,"toggled":true,"child":[{"name":"637711823070187860","id":8,"child":[]},{"name":"637723898039536030","id":9,"child":[]},{"name":"637723898039536030","id":10,"child":[]},{"name":"637729945917641250","id":11,"child":[]}]}'
  );
  const data3 = {
    name: "notes",
    id: 1,
    toggled: true,
    child: [
      {
        name: "637711823070187860",
        id: 6,
        child: [],
      },
      {
        name: "637723898039536030",
        id: 3,
        child: [],
      },
    ],
  };

  const data2 = {
    name: "notes",
    id: 0,
    toggled: true,
    child: [
      {
        name: "637711823070187860",
        id: 8,
        child: [],
      },
      {
        name: "637723898039536030",
        id: 8,
        child: [],
      },
      {
        name: "637723898039536030",
        id: 10,
        child: [],
      },
      {
        name: "637729945917641250",
        id: 11,
        child: [],
      },
    ],
  };

  //create Collapse button data
  const [collapseAll, setCollapseAll] = useState(false);
  const handleCollapseAll = (value) => setCollapseAll(value);

  //Create file action data*
  const handleFileOnClick = (file) => {
    setCurrentFolderName(file);
    setCreateNewButtonInFolder(true);
  };

  const action = {
    fileOnClick: handleFileOnClick,
  };

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
      let response = await NotesService.getAll();
      setCurrentDataState(response);
      console.log(response);
    }
    async function getFileTreeview() {
      let response = await NotesService.getNoteTreeViewStructure();
      setCurrentTreeViewData(response);
      //setCurrentTreeViewData(data);
      setCurrentTreeViewDataLoaded(true);
      console.log(response);
      //console.log(data);
      console.log(currentTreeViewData);
    }
    getNotes();
    getFileTreeview();
  }, []);

  const handleClickedRow = (e, id) => {
    const win = window.open("/writingpage/" + id, "_blank");
    win.focus();
  };

  const handleCreateFolder = async () => {
    await NotesService.createFolder(currentInputState);
  };

  const handleCreateNewNoteInFolder = async () => {};

  //TODO: Have button dashboard, so that we can open writing page if there is no data
  //in the database.
  const handleGoToWritingPage = async () => {
    let model = {
      id: 0,
      text: "welcome to your note",
    };
    let noteId = await NotesService.addorUpdate(model);
    console.log(noteId);
    const win = window.open("/writingpage/" + noteId, "_blank");
    win.focus();
  };
  <td onClick={() => window.open("someLink", "_blank")}>text</td>;
  return (
    <div>
      <h1 className="text-center">Stand Up App</h1>
      <div>
        <button onClick={() => setCollapseAll(true)}>Collapse All</button>
        {currentTreeViewDataLoaded === true ? (
          <FileTree
            data={currentTreeViewData}
            action={action} //optional
            collapseAll={{ collapseAll, handleCollapseAll }} //Optional
            decorator={treeDecorator} //Optional
            //onFolderClick={(e) => handleFolderClick(e)}
          />
        ) : (
          "loading"
        )}
      </div>
      <input
        type="text"
        id="folderName"
        name="folderName"
        onChange={(e) => setCurrentInputState(e.target.value)}
        value={currentInputState}
      ></input>
      {console.log(currentInputState)}
      <Button onClick={() => handleCreateFolder()} text={"Create New Folder"} />
      <Button
        onClick={() => handleGoToWritingPage()}
        text={"Create New Note"}
      />
      {createNewButtonInFolder ? (
        <Button
          onClick={() => handleCreateNewNoteInFolder()}
          text={"Create New Note in " + currentFolderName.name}
        />
      ) : (
        <> </>
      )}
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
    </div>
  );
}
