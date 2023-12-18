import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EquipmentForCompany.css';

const EquipmentForCompany = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/v1/company/${companyId}`);
        if (response.ok) {
          const data = await response.json();
          setCompany(data);
        } else {
          console.error('Failed to fetch company');
        }
      } catch (error) {
        console.error('Error fetching company', error);
      }
    };

    fetchCompanyById();
  }, [companyId]);

  useEffect(() => {
    // Fetch all equipment data from the server
    const fetchEquipment = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/v1/equipment/company/${companyId}`);
        if (response.ok) {
          const data = await response.json();
          setEquipmentList(data);
        } else {
          console.error('Failed to fetch equipment for company');
        }
      } catch (error) {
        console.error("Error fetching equipment", error);
      }
    };

    fetchEquipment();
  },[companyId]);

  useEffect(() => {
    const fetchAppointmentsByCompanyId = async () => {
      try {
        const response = await fetch(`http://localhost:8090/api/v1/appointment/byCompany/${companyId}`);
        if (response.ok) {
          const data = await response.json();
          setAppointmentList(data);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments', error);
      }
    };

    fetchAppointmentsByCompanyId();
  }, [companyId]);

  const handleAddToSelectedEquipment = (selectedId) => {
    const selected = equipmentList.find((equipment) => equipment.id === selectedId);
    setSelectedEquipment((prevSelected) => [...prevSelected, selected]);
    setEquipmentList((prevEquipment) => prevEquipment.filter((equipment) => equipment.id !== selectedId));
  };

  const handleRemoveFromSelectedEquipment = (selectedId) => {
    const selected = selectedEquipment.find((equipment) => equipment.id === selectedId);
    setSelectedEquipment((prevSelected) => prevSelected.filter((equipment) => equipment.id !== selectedId));
    setEquipmentList((prevEquipment) => [...prevEquipment, selected]);
  };

  const handleNextStep = () => {
    setStep(1);
  };

  const handlePreviousStep = () => {
    setStep(0);
  };

  if (!company) {
    // You can render a loading spinner or a message while waiting for the data to load
    return <p>Loading...</p>;
  }

  return (
    <div className="equipment-for-company-container">
      <h2>{company.companyName}</h2>
      <p>Address: {company.address}</p>
      <p>Average Grade: {company.averageGrade}</p>

      {step === 0 && (
        <div className="equipment-list-container">
          <h3>Equipment List:</h3>
          <ul>
            {equipmentList.map((equipment) => (
              <li key={equipment.id} className="equipment-item">
                <p>Equipment Name: {equipment.equipmentName}</p>
                <p>Category: {equipment.equipmentDescription}</p>
                <p>Price: {equipment.equipmentPrice}</p>
                <button onClick={() => handleAddToSelectedEquipment(equipment.id)}>
                  Add to Selected
                </button>
                {/* Add other equipment details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 0 && (
        <div className="selected-equipment-container">
          <h3>Selected Equipment:</h3>
          <ul>
            {selectedEquipment.map((selectedItem) => (
              <li key={selectedItem.id}>
                <p>Equipment Name: {selectedItem.equipmentName}</p>
                <p>Category: {selectedItem.equipmentDescription}</p>
                <p>Price: {selectedItem.equipmentPrice}</p>
                <button onClick={() => handleRemoveFromSelectedEquipment(selectedItem.id)}>
                  Remove from Selected
                </button>
                {/* Add other details for selected equipment */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 0 && selectedEquipment.length > 0 && (
        <button onClick={handleNextStep}>Next Step</button>
      )}

      {step === 1 && (
        <div className="selected-equipment-container">
          <h3>Company appointments:</h3>
          <ul>
            {appointmentList.map((appointment) => (
              <li key={appointment.id}>
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p>Time: {appointment.time}</p>
                <p>Duration: {appointment.duration}</p>
                {/* Add other details for selected equipment */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 1 && (
        <button onClick={handlePreviousStep}>Previous Step</button>
      )}
    </div>
  );
};

export default EquipmentForCompany;