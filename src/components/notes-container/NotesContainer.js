import React from "react";
import CardThumbnail from "../card-thumbnail/CardThumbnail";
//import NoteCard from "../note-card/NoteCard";
import "./notes-container.css";

const NotesContainer = (props) => {
  return (
    <div className="container">
      {props.data !== "" ? (
        props.data.map((option) => (
          <CardThumbnail text={"test note"}>{option.name}</CardThumbnail>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default NotesContainer;
