import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import Input from "../inputs/Input";

import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and Password are required!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:500/users`);
      const existingUser = response.data.find(
        (user) => user.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (existingUser) {
        alert("Email already exists. Please use a different email.");
        return;
      }

      await axios.post(`http://localhost:500/users`, {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        token: Math.random().toString(36).substring(2, 15),
      });

      alert(`Welcome, ${formData.firstName}!`);
      console.log(formData);
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      navigate("/web-task");
    } catch (error) {
      console.error(error);
      setError("Error registering user. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="form-card">
        <h2 className="form-heading">Sign up now</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <Input
            id="firstName"
            className="input"
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            id="lastName"
            className="input"
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            id="email"
            type="email"
            className="register-email-input"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            toggleable
          />
          <Button type="submit" text="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Register;
