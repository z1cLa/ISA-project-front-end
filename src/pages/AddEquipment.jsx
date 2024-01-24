import React, { useState } from "react";
import "./UpdateCompany.css";
import Navbar from "../ui/Navbar";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate, useParams } from "react-router-dom";

const AddEquipment = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    equipmentName: "",
    equipmentType: "",
    equipmentDescription: "",
    equipmentPrice: 0,
    companyId: companyId, // HERE NEEDED TO PASS FROM ID FROM COMPANY OVERVIEW
  });

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8090/api/v1/equipment/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add equipment: ${response.statusText}`);
      }

      toastr.success("Equipment added successfully");
      navigate("/company");
    } catch (error) {
      console.error(error);
      toastr.error("An error occurred while adding equipment.");
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="equipmentName"
              value={formData.equipmentName}
              onChange={handleChange}
              required
            />
            <label>Name</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="equipmentType"
              value={formData.equipmentType}
              onChange={handleChange}
              required
            />
            <label>Type</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="equipmentDescription"
              value={formData.equipmentDescription}
              onChange={handleChange}
              required
            />
            <label>Description</label>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="equipmentPrice"
              value={formData.equipmentPrice}
              onChange={handleChange}
              required
            />
            <label>Price</label>
          </div>

          <div className="center">
            <button type="submit" className="form-submit-btn">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEquipment;
