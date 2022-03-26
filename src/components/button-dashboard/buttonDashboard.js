import React from "react";
import "./buttonDashboard.css";

export default function ButtonDashBoard({ onClick, text }) {
  return (
    <button onClick={onClick} className="buttonDashboard">
      <span>{text}</span>
    </button>
  );
}
