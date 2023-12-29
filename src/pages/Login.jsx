import Navbar from "../ui/Navbar";
import { useState } from "react";
import "./Login.css";
import useAuth from "../hooks/useAuth";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login({ setLoggedUser }) {
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: "Invalid email address" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.email !== "") return;

    const response = await fetch("http://localhost:8090/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
    setFormData({ email: "", password: "" });
    navigate("/", { replace: true });
    const newUser = await whoAm();
    setLoggedUser(newUser);
  };

  const whoAm = async () => {
    console.log(localStorage.getItem("token"));
    const response = await fetch("http://localhost:8090/api/v1/auth/whoami", {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    return data;
  };

  return (
    <>
      <div className="login-container">
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="form-group-login">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={validateEmail}
              required
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group-login">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <button className="form-submit-btn-login" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
