import React, { useState, useEffect } from "react";
import "./AddCompany.css";
import Navbar from "../ui/Navbar";
import { useNavigate } from "react-router-dom";

const AddCompany = () => {
  const [companyData, setCompanyData] = useState({
    companyName: "",
    address: "",
    description: "",
    averageGrade: 0.0,
    selectedAdmin: null,
  });

  const [admins, setAdmins] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/v1/auth/all");
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
        } else {
          console.error("Failed to fetch admins");
        }
      } catch (error) {
        console.error("Error fetching admins", error);
      }
    };

    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setCompanyData((prevData) => {
      if (e.target.name === "selectedAdmin") {
        const selectedAdmin = admins.find((admin) => admin.id === parseInt(e.target.value));
        return { ...prevData, admins: [selectedAdmin] };
      }
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8090/api/v1/company/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
    });

    if (response.ok) {
      console.log("Company posted successfully");
      console.log(companyData);
      navigate("/");
    } else {
      const data = await response.json();
      setErrors(data.errors);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-company-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={companyData.companyName}
              onChange={handleChange}
              required
            />
            {errors.companyName && (
              <div className="error-message">{errors.companyName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={companyData.address}
              onChange={handleChange}
              required
            />
            {errors.address && (
              <div className="error-message">{errors.address}</div>
            )}
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={companyData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label>Average Grade:</label>
            <input
              type="number"
              step="0.1"
              name="averageGrade"
              value={companyData.averageGrade}
              onChange={handleChange}
              required
            />
            {errors.averageGrade && (
              <div className="error-message">{errors.averageGrade}</div>
            )}
          </div>

          <div className="form-group">
            <label>Select Admin:</label>
            <select
              name="selectedAdmin"
              value={companyData.selectedAdmin ? companyData.selectedAdmin.id : ""}
              onChange={handleChange}
            >
              <option value={null}>Select Admin</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.firstName} {admin.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <button type="submit">Post Company</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCompany;
