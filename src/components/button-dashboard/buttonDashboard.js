import React from "react";
import "./buttonDashboard.css";

export default function ButtonDashBoard({
  onClick,
  text,
  className = "buttonDashboard",
}) {
  return (
    <button onClick={onClick} className={className}>
      <span>{text}</span>
    </button>
  );
}
