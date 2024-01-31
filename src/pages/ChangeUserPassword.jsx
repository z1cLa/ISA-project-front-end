import React, { useState, useEffect } from "react";
import "./ChangeUserPassword.css";
import Navbar from "../ui/Navbar";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";

const ChangeUserPassword = ({ loggedUser }) => {

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assuming you have a userId to identify the user being updated
    if(formData.password==formData.confirmPassword){
    const response = await fetch(
      `http://localhost:8090/api/v1/auth/userPassword/${loggedUser.id}`,
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
    }else
    {
        toastr.success("Password and confirm password must match");
    }
  };

  return (
    <>
      <div className="edit-container">
        <form onSubmit={handleSubmit} className="two-column-form">

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
            <button className="form-submit-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeUserPassword;