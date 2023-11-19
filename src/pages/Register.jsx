import React, { useState } from "react";
import "./Register.css";
import Navbar from "../ui/Navbar";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    phoneNumber: "",
    profession: "",
    companyInfo: "",
  });

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: "Invalid email address" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const validatePassword = () => {
    if (formData.password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters",
      });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const validateConfirmPassword = () => {
    if (formData.confirmPassword !== formData.password) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
    } else {
      setErrors({ ...errors, confirmPassword: "" });
    }
  };

  const validatePhoneNumber = () => {
    // Assuming a simple validation for a 10-digit phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setErrors({ ...errors, phoneNumber: "Invalid phone number" });
    } else {
      setErrors({ ...errors, phoneNumber: "" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      errors.email !== "" ||
      errors.password !== "" ||
      errors.confirmPassword !== "" ||
      errors.phoneNumber !== ""
    ) {
      return;
    }
    const response = await fetch("http://localhost:8095/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    toastr.success("Check " + formData.email + " to verify your account.");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
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

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={validatePassword}
              required
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={validateConfirmPassword}
              required
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
            {errors.country && (
              <div className="error-message">{errors.country}</div>
            )}
          </div>

          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            {errors.city && <div className="error-message">{errors.city}</div>}
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={validatePhoneNumber}
              required
            />
            {errors.phoneNumber && (
              <div className="error-message">{errors.phoneNumber}</div>
            )}
          </div>

          <div className="form-group">
            <label>Profession:</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              required
            />
            {errors.profession && (
              <div className="error-message">{errors.profession}</div>
            )}
          </div>

          <div className="form-group">
            <label>Company Info:</label>
            <input
              type="text"
              name="companyInfo"
              value={formData.companyInfo}
              onChange={handleChange}
            />
            {errors.companyInfo && (
              <div className="error-message">{errors.companyInfo}</div>
            )}
          </div>

          <div className="form-group">
            <button className="form-submit-btn" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
