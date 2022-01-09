import React, { useEffect, useState } from "react";
import "draft-js/dist/Draft.css";
import NotesService from "../../services/NotesService";
import FileService from "../../services/FileService";
//import ImageArray from "../image-display/imageArray";
import "./rich-text.css";

export default function RichEditor(props) {
  const [editorState, setEditorState] = useState("");
  const [currentnoteState, setCurrentnoteState] = useState(0);
  const [currentnoteId, setcurrentnoteId] = useState(0);
  const [loadWritingPageNoteId, setloadWritingPageNoteId] = useState(props);
  const [imageState, setimageState] = useState();

  useEffect(() => {
    async function getNote() {
      //UNCOMMENT WHEN THE API IS TESTED

      let noteResponse = await NotesService.getNoteById(
        loadWritingPageNoteId.id
      );
      let response = await FileService.getImages(loadWritingPageNoteId.id);

      setCurrentnoteState(noteResponse);
      setcurrentnoteId(noteResponse.id);
    }
    if (loadWritingPageNoteId.id > 0) {
      getNote();
      setloadWritingPageNoteId(0);
    }
  }, []);

  const handleChange = async (e) => {
    setEditorState(e.target.value);
    let model = {
      id: currentnoteId,
      text: e.target.value,
    };
    let response = await NotesService.addorUpdate(model);
  };

  return (
    <div>
      {currentnoteId > 0 ? (
        <textarea
          className="richEditor"
          rows="1"
          cols="50"
          wrap="physical"
          name="comments"
          onChange={(e) => handleChange(e)}
        >
          {currentnoteState.text}
        </textarea>
      ) : (
        "Loading..."
      )}
      {/* {currentnoteId > 0 ? <div className="imageList"><Image images={currentnoteState.images}/></div> : "Loading..."} */}
    </div>
  );
}
