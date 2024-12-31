import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Button from "../button/Button";
import Input from "../inputs/Input";

import "./login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:500/todos/api/users?email=${email}`
      );
      const user = response.data[0];
      if (user && user.password === password) {
        setError("");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        alert(`Welcome back, ${user.firstName || "User"}!`);
        console.log(user);
        setEmail("");
        setPassword("");
        navigate("/web-task");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Error while logging in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="heading">Log In</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <Input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          toggleable
        />
        <Button text="Login" type="submit" />
        <p className="mb-5">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#393f81" }}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
