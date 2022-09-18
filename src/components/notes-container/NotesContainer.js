import React, { useState, useCallback } from "react";
import CardThumbnail from "../card-thumbnail/CardThumbnail";
//import NoteCard from "../note-card/NoteCard";
import "./notes-container.css";
import Alert from "@mui/material/Alert";

const thumbNailDisplay = (images) => {
  return images.length > 0 ? images[0].data : [];
};

const NotesContainer = (props) => {
  const [deleteNote, setDeletedNote] = useState(false);

  const handleDeleteThumbnail = (id) => {
    //setDeletedNote(hasBeenDeleted);
    console.log("reaching handleDeleteThumbnail");
    props.parentCallBack(id);
  };

  const callBack = useCallback((id) => {
    //TODO: Delete Note.
    //TODO: Refresh/Reload notes.
    console.log(id + " arriving here for deletion");
  }, []);

  return (
    <div className="container">
      {props.data.length > 0
        ? props.data.map((option) => (
            <CardThumbnail
              encodedImg={thumbNailDisplay(option?.images)}
              text={option.text}
              id={option.id}
              parentCallBack={handleDeleteThumbnail}
            >
              {option.name}
            </CardThumbnail>
          ))
        : "loading"}
      {console.log("Notes Container props" + props)}
    </div>
  );
};

export default NotesContainer;
