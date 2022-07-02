import React from "react";
import CardThumbnail from "../card-thumbnail/CardThumbnail";
//import NoteCard from "../note-card/NoteCard";
import "./notes-container.css";

const NotesContainer = (props) => {
  return (
    <div className="container">
      {props.data.length > 0
        ? props.data.map((option) => (
            <CardThumbnail text={option.text}>{option.name}</CardThumbnail>
          ))
        : "loading"}
      {console.log(props.data)}
    </div>
  );
};

export default NotesContainer;
