import React, { useState } from "react";
import "./navBar.css";

const Navbar = () => {
  //const [active, setActive] = useState(false);

  //   const handleClick = () => {
  //     setActive(!active);
  //   };

  return (
    <nav className="nav">
      <h1>Standup App</h1>
      {/* <div className="menu-icon" onClick={handleClick}>
        <i className={active ? "fas fa-times" : "fas fa-bars"}></i>
      </div> */}
      {/* <ul className={active ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul> */}
      {/* <Button>SIGN UP</Button> */}
    </nav>
  );
};

export default Navbar;
