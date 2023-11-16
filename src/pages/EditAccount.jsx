import React, { useState, useEffect } from "react";
import "./Register.css"; // Import your CSS file
import Navbar from "../ui/Navbar";

const EditAccount = () => {
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace 'userId' with the actual user ID you want to fetch
        const userId = 1; // Example user ID
        const response = await fetch(`http://localhost:8090/api/v1/auth/user/${userId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();

        setFormData({
          email:userData.email || "",
          password:userData.password || "", // You might not want to pre-fill the password for security reasons
          confirmPassword:userData.confirmPassword ||  "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          city: userData.city || "",
          country: userData.country || "",
          phoneNumber: userData.phoneNumber || "",
          profession: userData.profession || "",
          companyInfo: userData.companyInfo || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once on mount
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
  // Assuming you have a userId to identify the user being updated
  const userId = 1;
  const response = await fetch(`http://localhost:8090/api/v1/auth/user/${userId}`, {
    method: "PUT", // Change the method to PUT
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  console.log(data);
};


  return (
    <>
      <Navbar />
      <div className="register-container">
        <form onSubmit={handleSubmit}>

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

          {/* Add similar blocks for confirmPassword, firstName, lastName, city, country, phoneNumber, proficiency, and companyInfo */}

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

          {/* Add similar blocks for phoneNumber, proficiency, and companyInfo */}

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
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAccount;