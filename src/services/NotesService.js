//let Base64 = require('base-64');

const notesService = "https://localhost:5001/notes/";
const fileService = "https://localhost:5001/file";
const folderService = "https://localhost:5001/folder/";
// const trackService = "https://trackery.signos.io:443/kinetic";
// const password = "Signos2021!";
// const username = "Kinetic";
// const secret = Buffer.from(username + ":" + password).toString("base64");
// let headers = new Headers();
// headers.set("Authorisation", "Basic " + secret);

// const postTrack = async () => {
//   let response = await fetch(trackService, {
//     method: "POST",
//     headers: headers,
//   });
//   response = await response.json();
//   return response;
// };

const getAll = async () => {
  let response = await fetch(notesService + "getnotes");
  response = await response.json();
  return response;
};

const getNoteById = async (id) => {
  let response = await fetch(`${notesService}getId/${id}`);
  response = await response.json();
  return response;
};

const getNoteTreeViewStructure = async () => {
  let response = await fetch(`${notesService}getnotestreeview`);
  response = await response.json();
  return response;
};
//TODO create action in backend C# api
const createFolder = async (data) => {
  let model = { folderName: data };
  let response = await fetch(`${folderService}createfolder`, {
    method: "POST",
    body: JSON.stringify(model),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  return response;
};

const update = async (data) => {
  let response = await fetch(notesService + "updatenote", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  return response;
};

const addorUpdate = async (currentobject) => {
  let id = currentobject.id; //get the id from the current object

  //TODO: fix the error in saving the note text in the editor

  let response = await fetch(notesService + "addorupdate/" + id, {
    method: "PUT",
    body: JSON.stringify(currentobject),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // 'Access-Control-Allow-Origin': '*'
    },
  });
  response = await response.json();
  return response;
};

export default {
  getAll,
  update,
  addorUpdate,
  getNoteById,
  getNoteTreeViewStructure,
  createFolder,
  //postTrack,
};
