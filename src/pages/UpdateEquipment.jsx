import React, { useState, useEffect } from "react";
import "./UpdateCompany.css";
import Navbar from "../ui/Navbar";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate, useParams } from "react-router-dom";

const EditEquipment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    equipmentName: "",
    equipmentType: "",
    equipmentDescription: "",
    equipmentPrice: 0,
    companyId: 0,
  });

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/equipment/${id}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch equipment data: ${response.statusText}`
          );
        }

        const equipmentData = await response.json();

        setFormData({
          equipmentName: equipmentData.equipmentName || "",
          equipmentType: equipmentData.equipmentType || "",
          equipmentDescription: equipmentData.equipmentDescription || "",
          equipmentPrice: equipmentData.equipmentPrice || 0,
          companyId: equipmentData.companyId || 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchEquipmentData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8090/api/v1/equipment/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    toastr.success("Equipment updated successfully");
    navigate("/company");
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
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEquipment;
