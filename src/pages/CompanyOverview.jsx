import React, { useState, useEffect } from "react";
import "./CompanyOverview.css";
import { Link } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.css";


const CompanyOverview = ({loggedUser}) => {
  
  const [companyId, setCompanyId] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    description: "",
    averageGrade: "",
    appointmentId: "",
  });

  const [equipment, setEquipment] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [equipmentPopupOpen, setEquipmentPopupOpen] = useState(false);
  const [adminPopupOpen, setAdminPopupOpen] = useState(false);
  const [selectedEquipmentIndex, setSelectedEquipmentIndex] = useState(0);

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  useEffect(() => {
    const getCompanyId = async () => {
      const response = await fetch(`http://localhost:8090/api/v1/company/companyId/${loggedUser.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      const data = await response.json();
      setCompanyId(data);
      //alert(data);
    };
    getCompanyId();
  }, []);


  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Proveri da li companyId ima vrednost pre nego što izvršiš zahtev
        if (companyId) {
          const response = await fetch(
            `http://localhost:8090/api/v1/company/${companyId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
  
          if (!response.ok) {
            throw new Error(`Failed to fetch company data: ${response.statusText}`);
          }
  
          const companyData = await response.json();
  
          setFormData({
            companyName: companyData.companyName || "",
            address: companyData.address || "",
            description: companyData.description || "",
            averageGrade: companyData.averageGrade || "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEquipmentData = async () => {
      try {
        // for now
        if(companyId){
        const response = await fetch(
          `http://localhost:8090/api/v1/equipment/company/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch equipment data: ${response.statusText}`
          );
        }

        const equipmentData = await response.json();
        setEquipment(equipmentData);
      }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAdminsData = async () => {
      try {
        // for now
        if(companyId){
        const response = await fetch(
          `http://localhost:8090/api/v1/company/${companyId}/admins`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch admins data: ${response.statusText}`
          );
        }

        const adminsData = await response.json();
        setAdmins(adminsData);
      }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanyData();
    fetchEquipmentData();
    fetchAdminsData();
  }, [companyId]);

  const handlePopupToggle = () => {
    if (equipment.length === 0) {
      toastr.warning("There are no equipment available.");
      return;
    }
    setEquipmentPopupOpen(!equipmentPopupOpen);
  };

  const handleAdminPopupToggle = () => {
    if (admins.length === 0) {
      toastr.warning("There are no admins available.");
      return;
    }
    setAdminPopupOpen(!adminPopupOpen);
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

  const handleShowAdmins = () => {
    if (admins.length === 0) {
      toastr.warning("There are no admins available.");
      return;
    }
    handleAdminPopupToggle();
  };

  const handleDeleteEquipment = async () => {
    try {
      const equipmentIdToDelete = equipment[selectedEquipmentIndex]?.id;

      if (!equipmentIdToDelete) {
        toastr.warning("No equipment selected for deletion.");
        return;
      }

      const response = await fetch(
        `http://localhost:8090/api/v1/equipment/delete/${equipmentIdToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.ok) {
        // Remove the deleted equipment from the state
        const updatedEquipment = equipment.filter(
          (_, index) => index !== selectedEquipmentIndex
        );
        setEquipment(updatedEquipment);

        toastr.success("Equipment deleted successfully.");
      } else {
        toastr.error("Failed to delete equipment. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting equipment:", error);
      toastr.error("An error occurred while deleting equipment.");
    } finally {
      // Close the equipment popup
      handlePopupToggle();
    }
  };

  const EquipmentPopup = () => (
    <div className={`popup ${equipmentPopupOpen ? "open" : ""}`}>
      <div className="popup-content">
        <h2>Equipment {selectedEquipmentIndex + 1}</h2>
        <p>
          Equipment Name: {equipment[selectedEquipmentIndex]?.equipmentName}
        </p>
        <p>
          Equipment Type: {equipment[selectedEquipmentIndex]?.equipmentType}
        </p>
        <p>
          Equipment Description:{" "}
          {equipment[selectedEquipmentIndex]?.equipmentDescription}
        </p>
        <p>
          Equipment Price: {equipment[selectedEquipmentIndex]?.equipmentPrice}
        </p>
      </div>

      <button className="navigation-btn previous" onClick={handlePrevEquipment}>
        Previous
      </button>
      <button className="navigation-btn next" onClick={handleNextEquipment}>
        Next
      </button>
      <Link
        to={`/edit-equipment/${equipment[selectedEquipmentIndex]?.id}`}
        className="link"
      >
        <button className="form-submit-btn">Update Equipment</button>
      </Link>
      <button className="form-submit-btn" onClick={handleDeleteEquipment}>
        Delete this equipment
      </button>
      <button className="form-submit-btn" onClick={handlePopupToggle}>
        Close
      </button>
    </div>
  );

  const AdminPopup = () => (
    <div className={`popup ${adminPopupOpen ? "open" : ""}`}>
      <div className="popup-content">
        <p>Admins:</p>
        {admins.map((admin, index) => (
          <p key={index}>{`${admin.firstName} ${admin.lastName}`}</p>
        ))}
      </div>

      <button className="form-submit-btn" onClick={handleAdminPopupToggle}>
        Close
      </button>
    </div>
  );

  return (
    <>
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
        <button className="form-submit-btn" onClick={handleShowAdmins}>
          Show Admins
        </button>
        {equipmentPopupOpen && <EquipmentPopup />}
        {adminPopupOpen && <AdminPopup />}
        <Link to="/edit-company" className="link">
          <button className="form-submit-btn">Update company</button>
        </Link>
        <Link to="/add-appointment" className="link">
          <button className="form-submit-btn">Add appointment</button>
        </Link>
        <Link to={`/add-equipment/${companyId}`} className="link">
          <button className="form-submit-btn">Add equipment</button>
        </Link>
        <Link to={`/search-equipment/${companyId}`} className="link">
          <button className="form-submit-btn">Search equipment</button>
        </Link>
      </div>
    </>
  );
};

export default CompanyOverview;
