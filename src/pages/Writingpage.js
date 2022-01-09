import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./writingpage.css";
import RichEditor from "../components/rich-editor/RichEditor";
import Previews from "../components/drop-zone/Previews";

export default function WritingPage() {
  const { id } = useParams();
  return (
    <div className="pageContainer">
      <h1>Comedy Word Editor</h1>
      <div></div>
      <RichEditor id={id} target="_blank" />
      <Previews id={id} />
    </div>
  );
}
