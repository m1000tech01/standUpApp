import React, { useState } from "react";
import FileService from "../../services/FileService";
import "./image.css";

export default function ImageArray(props) {
  const [pictures, setPictures] = useState(props);
  const [imageDelete, setImageDelete] = useState(false);

  const handleDelete = async (e) => {
    await FileService.deleteImage(pictures.images[e].id);
    pictures.images.splice(e, 1);
    const result = pictures;
    setPictures(result);
    setImageDelete(!imageDelete);
  };

  // // const ImageThumbNail = (props) => {
  // //   return (
  // //     <div className="parent">
  // //       <img src={`data:image/jpg;base64,${props.data.data}`} alt="Logo" />
  // //       <button className="close" onClick={() => handleDelete(props.data.id)}>
  // //         X
  // //       </button>
  // //     </div>
  // //   );
  // // };

  // let images = props.images;

  // let imageList = [];
  // if (images !== undefined) {
  //   for (var i = 0; i < images.length; i++) {
  //     //imageList.push(<img src={`data:image/jpg;base64,${images[i].data}`} alt="Logo" />)
  //     imageList.push(<ImageThumbNail data={images[i]} />);
  //   }
  // }
  const ArrayOfImages = (props) => {
    console.log(pictures.images);
    if (pictures !== undefined && pictures.images !== undefined)
      if (pictures.images.length > 0) {
        if (pictures.images.length > 0) {
          const images = pictures.images;
          return images.map((imageElement, index) => {
            return (
              <div className="parent">
                <img
                  src={`data:image/png;base64,${imageElement.data}`}
                  alt="Logo"
                />
                <button className="close" onClick={(e) => handleDelete(index)}>
                  X
                </button>
              </div>
            );
          });
        }
      } else {
        return <span> NO IMAGE FOUND </span>;
      }
  };
  return (
    <div>
      {<ArrayOfImages />}
      {/* <img src={`data:image/jpg;base64,${data}`} alt="Logo" /> */}
    </div>
  );
}
