import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EquipmentForCompany.css";
import toastr from "toastr";
import NewAppointment from "../components/NewAppointment";

const EquipmentForCompany = ({ loggedUser }) => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [step, setStep] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({
    status: "In progress",
    appointment: {
      id: "",
      date: "",
      time: "",
      duration: "",
      isCompanyAppointment: "",
    },
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      country: "",
      city: "",
      profession: "",
      companyInfo: "",
      role: "",
      verification_Code: "",
      companies: [],
      is_verified: true,
    },
  });

  const [showMakeNewAppointment, setShowMakeNewAppointment] = useState();
  const [cancellations, setCancellations] = useState();

  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/company/id/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCompany(data);
        } else {
          console.error("Failed to fetch company");
        }
      } catch (error) {
        console.error("Error fetching company", error);
      }
    };

    fetchCompanyById();
  }, [companyId]);

  useEffect(() => {
    // Fetch all equipment data from the server
    const fetchEquipment = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/equipment/company/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setEquipmentList(data);
        } else {
          console.error("Failed to fetch equipment for company");
        }
      } catch (error) {
        console.error("Error fetching equipment", error);
      }
    };

    fetchEquipment();
  }, [companyId]);

  useEffect(() => {
    const fetchUserCancellations = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/cancellation/user/${loggedUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCancellations(data);
          return data; // Return the fetched data
        } else {
          console.error("Failed to fetch user cancellations");
        }
      } catch (error) {
        console.error("Error fetching user cancellations", error);
      }
    };

    const fetchAppointmentsByCompanyId = async (cancellationsData) => {
      try {
        const response = await fetch(
          `http://localhost:8090/api/v1/appointment/byCompany/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const filteredAppointments = data.filter(
            (appointment) =>
              !cancellationsData.some(
                (cancellation) => cancellation.appointmentId === appointment.id
              )
          );
          setAppointmentList(filteredAppointments);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };

    fetchUserCancellations().then((cancellationsData) => {
      if (cancellationsData) {
        fetchAppointmentsByCompanyId(cancellationsData);
      }
    });
  }, [loggedUser.id, companyId]);

  useEffect(() => {
    console.log("LU: ", loggedUser);
    const fetchUserData = async () => {
      setFormData((prevData) => ({
        ...prevData,
        user: loggedUser,
      }));
    };
    fetchUserData();
  }, [loggedUser]);

  const handleAddToSelectedEquipment = (selectedId) => {
    const selected = equipmentList.find(
      (equipment) => equipment.id === selectedId
    );
    setSelectedEquipment((prevSelected) => [...prevSelected, selected]);
    setEquipmentList((prevEquipment) =>
      prevEquipment.filter((equipment) => equipment.id !== selectedId)
    );
  };

  const handleRemoveFromSelectedEquipment = (selectedId) => {
    const selected = selectedEquipment.find(
      (equipment) => equipment.id === selectedId
    );
    setSelectedEquipment((prevSelected) =>
      prevSelected.filter((equipment) => equipment.id !== selectedId)
    );
    setEquipmentList((prevEquipment) => [...prevEquipment, selected]);
  };

  const handleNextStep = () => {
    setStep(1);
  };

  const handlePreviousStep = () => {
    setStep(0);
  };

  const handleSelectAppointment = (selectedAppointment) => {
    setSelectedAppointment(selectedAppointment);
    setFormData((prevFormData) => ({
      ...prevFormData,
      appointment: {
        id: selectedAppointment.id,
        date: selectedAppointment.date,
        time: selectedAppointment.time,
        duration: selectedAppointment.duration,
        isCompanyAppointment: selectedAppointment.isCompanyAppointment,
      },
    }));
  };

  const handleReserve = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData, equipments: [...selectedEquipment] };

    try {
      const response = await fetch(
        "http://localhost:8090/api/v1/reservation/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Reservation created successfully:", data);
        toastr.success('Appointment created successfuly')
        // Handle success (e.g., redirect to a success page)
      } else {
        const errorData = await response.json();
        console.error(
          "Error creating reservation:",
          response.statusText,
          errorData
        );
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle other errors
    }
  };

  if (!company) {
    // You can render a loading spinner or a message while waiting for the data to load
    return <p>Loading...</p>;
  }

  return (
    <>
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
                  <button
                    onClick={() => handleAddToSelectedEquipment(equipment.id)}
                  >
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
                  <button
                    onClick={() =>
                      handleRemoveFromSelectedEquipment(selectedItem.id)
                    }
                  >
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
          <div className="selected-appointment-container">
            <h3>Company Appointments:</h3>
            <ul>
              {appointmentList.map((appointment) => (
                <li key={appointment.id}>
                  <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Duration: {appointment.duration}</p>
                  <button
                    className="select-appointment-button"
                    onClick={() => handleSelectAppointment(appointment)}
                  >
                    Select Appointment
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowMakeNewAppointment((prev) => !prev)}>
              Make new appointment
            </button>
            {showMakeNewAppointment && (
              <NewAppointment selectedEquipment={selectedEquipment} />
            )}
          </div>
        )}

        {step === 1 && selectedAppointment && (
          <div>
            <h3>Selected Appointment:</h3>
            <p>
              Date: {new Date(selectedAppointment.date).toLocaleDateString()}
            </p>
            <p>Time: {selectedAppointment.time}</p>
            <p>Duration: {selectedAppointment.duration}</p>
            {/* Add other details for the selected appointment */}
            <button onClick={handleReserve}>Reserve</button>
          </div>
        )}

        {step === 1 && (
          <button onClick={handlePreviousStep} style={{ marginTop: "10px" }}>
            Previous Step
          </button>
        )}
      </div>
    </>
  );
};

export default EquipmentForCompany;
