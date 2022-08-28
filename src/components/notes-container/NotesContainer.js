import React, { useState } from "react";
import CardThumbnail from "../card-thumbnail/CardThumbnail";
//import NoteCard from "../note-card/NoteCard";
import "./notes-container.css";
import Alert from "@mui/material/Alert";

const thumbNailDisplay = (images) => {
  return images.length > 0 ? images[0].data : [];
};

const NotesContainer = (props) => {
  const [deleteNote, setDeletedNote] = useState(false);

  const handleDeleteThumbnail = () => {
    //setDeletedNote(hasBeenDeleted);
    console.log("reaching handleDeleteThumbnail");
  };

  return (
    <div className="container">
      {props.data.length > 0
        ? props.data.map((option) => (
            <CardThumbnail
              encodedImg={thumbNailDisplay(option?.images)}
              text={option.text}
              id={option.id}
              parentDeleteCallback={handleDeleteThumbnail()}
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
