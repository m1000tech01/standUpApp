import React, { useState } from "react";
import ButtonDashBoard from "../button-dashboard/buttonDashboard";
import "./navBar.css";

const NavbarDashboard = () => {
  //const [active, setActive] = useState(false);

  //   const handleClick = () => {
  //     setActive(!active);
  //   };

  return (
    <nav className="nav-bar-dashboard">
      <h1>Standup App</h1>
      <div className="breadcrumb-container">
        <div className="breadcrumb">My Drive</div>
        <button className="dropdown">▼</button>
      </div>
      <ButtonDashBoard text="NEW" />
    </nav>
  );
};

export default NavbarDashboard;
