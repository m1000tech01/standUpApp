import NotesService from "./NotesService";

const fileService = "https://localhost:5001/file";

const updateFile = async (fileName, file, id) => {
  let formdata = new FormData();
  formdata.append("file", file);
  formdata.append("fileName", fileName);
  formdata.append("noteId", id);

  let response = await fetch(fileService, {
    method: "POST",
    body: formdata,
  });
  //response = await response.json()
  return response;
};

const getImages = async (id) => {
  let mapImages = { images: [], note: {} };

  let note = await NotesService.getNoteById(id);
  mapImages.note.id = id;
  mapImages.note.text = note.text;
  for (var i = 0; i < note.images.length; i++) {
    let image = {
      data: note.images[i].data,
      mimeType: note.images[i].mimeType,
      fileName: note.images[i].fileName,
      id: note.images[i].id,
    };
    mapImages.images.push(image);
  }
  return mapImages;
};

const deleteImage = async (id) => {
  let response = await fetch(`${fileService}?id=${id}`, {
    method: "DELETE",
  });
  //response = await response.json();
  return response;
};

export default {
  updateFile,
  getImages,
  deleteImage,
};
