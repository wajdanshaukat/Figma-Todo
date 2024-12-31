import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/logout-icon.png";
import LocationIcon from "../../assets/location-white.png";
import TaskIcon from "../../assets/copy-icon.png";
import BlackCopy from "../../assets/copy-black.png"; 
import WhiteLocation from "../../assets/location-white.png";

import "./side-bar.css";

const SideBar = () => {
  const [active, setActive] = useState("task");
  const navigate = useNavigate();

  const handleTaskClick = () => {
    setActive("task");
    navigate("/task");
  };

  const handleLocationClick = () => {
      setActive("location"); 
      navigate("/location"); 
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/"); 
    window.location.reload();
  };

  return (
    <div className="left-container">
      <div
        className={`text ${active === "task" ? "active" : ""}`}
        onClick={handleTaskClick}
      >
        <img src={active === "task" ? BlackCopy : TaskIcon} alt="Task Icon" />
        <p>Task</p>
      </div>
      <div
        className={`Location ${active === "location" ? "active" : ""}`}
        onClick={handleLocationClick}
      >
        <img
          src={active === "location" ? WhiteLocation : LocationIcon}
          alt="Location Icon"
        />
        <p>Location</p>
      </div>
      <div className="Btn" onClick={handleLogoutClick}>
        <img src={LogoutIcon} alt="Logout Icon" />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default SideBar;
