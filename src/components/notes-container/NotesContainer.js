import React from "react";
import CardThumbnail from "../card-thumbnail/CardThumbnail";
//import NoteCard from "../note-card/NoteCard";
import "./notes-container.css";

const thumbNailDisplay = (images) => {
  return images.length > 0 ? images[0].data : [];
};
const NotesContainer = (props) => {
  return (
    <div className="container">
      {props.data.length > 0
        ? props.data.map((option) => (
            <CardThumbnail
              encodedImg={thumbNailDisplay(option?.images)}
              text={option.text}
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
