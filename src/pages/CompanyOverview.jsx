import React, { useState, useEffect } from "react";
import "./CompanyOverview.css"; 
import { Link } from "react-router-dom";
import Navbar from "../ui/Navbar";
import toastr from 'toastr';
import 'toastr/build/toastr.css'; 

const CompanyOverview = () => {
    const [formData, setFormData] = useState({
      companyName: "",
      address: "",
      description: "",
      averageGrade: "",
      appointmentId: ""
    });

    const [equipment, setEquipment] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(0);


    toastr.options = {
        positionClass: 'toast-top-right',
        hideDuration: 300,
        timeOut: 3000,
        closeButton: true,
      };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyId = 1; //for now
        const response = await fetch(`http://localhost:8090/api/v1/company/${companyId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();

        setFormData({
          companyName:userData.companyName || "",
          address:userData.address || "", 
          description: userData.description || "",
          averageGrade: userData.averageGrade || "",
          appointmentId: userData.appointmentId || ""
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEquipmentData = async () => {
        try {
          const companyId = 1; // Replace with the actual company ID
          const response = await fetch(`http://localhost:8090/api/v1/equipment/company/${companyId}`);
  
          if (!response.ok) {
            throw new Error(`Failed to fetch equipment data: ${response.statusText}`);
          }
  
          const equipmentData = await response.json();
          setEquipment(equipmentData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCompanyData();
      fetchEquipmentData();
    
    
  }, []); 

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleNextEquipment = () => {
    setSelectedEquipmentIndex((prevIndex) =>
      prevIndex < equipment.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevEquipment = () => {
    setSelectedEquipmentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : equipment.length - 1
    );
  };


  return (
    <>
      <Navbar />
      <div className="card">
        <div className="items">
          <h1 className="h1">{formData.companyName}</h1>
          <div className="field">
            <p className="label">Address:</p>
            <p className="value">{formData.address}</p>
          </div>
          <div className="field">
            <p className="label">Description:</p>
            <p className="value">{formData.description}</p>
          </div>
          <div className="field">
            <p className="label">Average Grade:</p>
            <p className="value">{formData.averageGrade}</p>
          </div>
        </div>
        <button className="form-submit-btn" onClick={handlePopupToggle}>
            Show Equipment
          </button>
          {isPopupOpen && (
            <div className={`popup ${isPopupOpen ? 'open' : ''}`}>
              <div className="popup-content">
                <p>Equipment {selectedEquipmentIndex + 1}</p>
                <p>Equipment Name: {equipment[selectedEquipmentIndex]?.equipmentName}</p>
                <p>Equipment Type: {equipment[selectedEquipmentIndex]?.equipmentType}</p>
                <p>Equipment Description: {equipment[selectedEquipmentIndex]?.equipmentDescription}</p>
                <p>Equipment Price: {equipment[selectedEquipmentIndex]?.equipmentPrice}</p>
              </div>

              <button className="navigation-btn previous" onClick={handlePrevEquipment}>
                Previous
              </button>
              <button className="navigation-btn next" onClick={handleNextEquipment}>
                Next
              </button>
              <button className="form-submit-btn" onClick={handlePopupToggle}>
                Close
              </button>
              
            </div>
          )}
        <Link to="/edit-company" className="link">
          <button className="form-submit-btn">Update company</button>
        </Link>
      </div>
    </>
  );
};

export default CompanyOverview;