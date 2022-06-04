import React from "react";
import NoteCard from "../note-card/NoteCard";

const NotesContainer = (props) => {
  return props.data.map((note) => {
    <NoteCard text="test string" />;
  });
};

export default NotesContainer;
