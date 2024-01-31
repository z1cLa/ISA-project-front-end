import React, { useState, useEffect } from "react";
import "./EditAccount.css";
import Navbar from "../ui/Navbar";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";

const EditAccount = ({ loggedUser }) => {

  const navigate = useNavigate();

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
    penaltyPoints: "0",
    user: {},
  });

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace 'userId' with the actual user ID you want to fetch
        const response = await fetch(
          `http://localhost:8090/api/v1/auth/oneUser/${loggedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();

        setFormData({
          email: userData.email || "",
          password: userData.password || "", // You might not want to pre-fill the password for security reasons
          confirmPassword: userData.confirmPassword || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          city: userData.city || "",
          country: userData.country || "",
          phoneNumber: userData.phoneNumber || "",
          profession: userData.profession || "",
          companyInfo: userData.companyInfo || "",
          penaltyPoints: userData.penaltyPoints || "0",
        });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUser2Data = async () => {

      setFormData((prevData) => ({
        ...prevData,
        user: loggedUser,
      }));
    };

    fetchUserData();
    fetchUser2Data();
  }, []); // Empty dependency array ensures this effect runs only once on mount

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
    const response = await fetch(
      `http://localhost:8090/api/v1/auth/user/${loggedUser.id}`,
      {
        method: "PUT", // Change the method to PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      }
    );
    toastr.success("Updated");
    const data = await response.json();
    console.log(data);
    navigate("/");
  };

  return (
    <>
      <div className="edit-container">
        <form onSubmit={handleSubmit} className="two-column-form">

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

          <div>
            
          </div>

          <div className="form-group">
            <label>Penalty Points:</label>
            <span>{/* Add logic to display penalty points */}{formData.penaltyPoints}</span>
          </div>

          <div className="form-group">
            <label>User Category:</label>
            <span>{/* Add logic to display user category */}Bronze</span>
          </div>

          <div className="form-group">
            <button className="form-submit-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAccount;
