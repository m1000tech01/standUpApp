import React from "react";

export default function Button({ onClick, className, text }) {
  return (
    <button onClick={onClick} className={className}>
      <span>{text}</span>
    </button>
  );
}
