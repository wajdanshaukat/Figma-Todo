import React, { useState } from "react";
import WebTask from "../web-task/Web-task";
import Login from "../login/Login";
import SideBar from "../side-bar/Side-bar";

import "./web-location.css";

const LocationComponent = () => {
  const [currentLocation, setCurrentLocation] = useState("Loading...");
  const [currentLatitude, setCurrentLatitude] = useState("-");
  const [currentLongitude, setCurrentLongitude] = useState("-");
  const [previousLocations, setPreviousLocations] = useState([]);

  const addPreviousLocation = (location) => {
    setPreviousLocations((prevLocations) => [...prevLocations, location]);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLatitude(latitude.toFixed(4));
          setCurrentLongitude(longitude.toFixed(4));

          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.locality ? data.locality : "Unknown Location";
              setCurrentLocation(city);
              addPreviousLocation(city);
            })
            .catch((error) => {
              console.error("Error fetching location:", error);
              setCurrentLocation("Unknown Location");
              addPreviousLocation("Unknown Location");
            });
        },
        (error) => {
          console.error("Error getting current position:", error);
          setCurrentLocation("Unknown Location");
          addPreviousLocation("Unknown Location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setCurrentLocation("Geolocation not supported");
      addPreviousLocation("Geolocation not supported");
    }
  };

  return (
    <div className="container">
      <SideBar />
      <div className="right-container">
        <div className="mini-first">
          <h4>
            <button id="checkInBtn" type="button" onClick={getCurrentLocation}>
              + Check In
            </button>
          </h4>
          <h4>Current Location</h4>
          <p>📍 {currentLocation}</p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;{currentLatitude}, {currentLongitude}
          </p>
        </div>

        <div className="mini-second">
          <h4>Previous locations</h4>
          <div id="previousLocations">
            {previousLocations.map((location, index) => (
              <div key={index} className="location-entry">
                <p className="location-icon">📍 {location}</p>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;{currentLatitude}, {currentLongitude}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;
