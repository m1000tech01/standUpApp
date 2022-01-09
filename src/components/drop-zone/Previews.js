import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import NotesService from "../../services/NotesService";
import FileService from "../../services/FileService";
import ImageArray from "../image-display/imageArray";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

//TODO: FILE IMAGE UPLOADING AND DELETE
//IF WE DELETE THE IMAGE WE SHOULD DELETE THE IMAGE FROM THE UI
//We have to click the upload button twice
//ADD CONFIRM INTO THE CONFIRM

export default function Previews(props) {
  const [files, setFiles] = useState([]);
  const [currentnoteState, setCurrentnoteState] = useState(0);
  const [imageState, setCurrentImageState] = useState([]);

  const upLoadFile = async () => {
    for (let i = 0; i < files.length; i++) {
      await FileService.updateFile(files[i].name, files[i], props.id);
    }
    let noteResponse = await NotesService.getNoteById(props.id);
    setCurrentnoteState(noteResponse);
    let response = await FileService.getImages(props.id);
    setCurrentImageState(response.images);
    setFiles([]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    async function fetchImages() {
      let response = await FileService.getImages(props.id);
      setCurrentImageState(response.images);
    }
    fetchImages();
    console.log(imageState);
  }, [files]);

  return (
    <>
      <div className="imageList">
        {imageState.length > 0 ? (
          <ImageArray images={imageState} />
        ) : (
          <span> no images found </span>
        )}
      </div>
      <section className="bg-blue-100 w-full p-16">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <button className="bg-green-100">Upload Files</button>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
        <button
          className="bg-green-100"
          type="submit"
          onClick={() => upLoadFile()}
        >
          Submit Files
        </button>
      </section>
    </>
  );
}
