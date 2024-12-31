import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WebTask from "./components/web-task/Web-task";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import LocationComponent from "./components/web-location/WebLocation";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/web-task" element={<WebTask />} />
              <Route path="/location" element={<LocationComponent />} />
              <Route path="/" element={<Navigate to="/web-task" />} />
              <Route path="*" element={<Navigate to="/web-task" />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
