import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.css";

const NewAppointment = ({ selectedEquipment, companyData, loggedUser}) => {
  const { companyId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ date: "" });

  const [avialableTimes, setAvialableTimes] = useState([]);

  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    duration: "1",
    isCompaniesAppointment: "false",
    isReserved: "false",
    company: {
      id: "",
      companyName: "",
      address: "",
      description: "",
      averageGrade: "",
    },
    user: null,
  });

  toastr.options = {
    positionClass: "toast-top-right",
    hideDuration: 300,
    timeOut: 3000,
    closeButton: true,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8090/api/v1/appointment/freeTimes/${companyId}/${formData.date}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvialableTimes(data);
        console.log("Reservation created successfully:", data);
      } else {
        const errorData = await response.json();
        console.error(
          "Error creating reservation:",
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const onChooseTime = (time) =>
  {
    setAppointment((prevData) => ({
      ...prevData,
      company: companyData,
      date: formData.date,
      time: time,
    }));
  };

  const onNewAppointmentTimeSelect = async () => {
      try {
        const response = await fetch("http://localhost:8090/api/v1/appointment/saveForSpecificAppointment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointment),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Appointment created successfully:", data);
          toastr.success("Appointment created successfully");
        } else {
          const errorData = await response.json();
          console.error(
            "Error creating reservation:",
            response.statusText,
            errorData
          );
        }
      } catch (error) {
        console.error("Error creating reservation:", error);
      }
    };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => {
              const selectedDate = e.target.value;
              const today = new Date().toISOString().split('T')[0];
  
              // Check if the selected date is not in the past
              if (selectedDate >= today) {
                setFormData((prev) => ({ ...prev, date: selectedDate }));
              } else {
                // Optionally, you can provide feedback to the user or handle the invalid input
                console.error('Please select a future date.');
              }
            }}
            min={new Date().toISOString().split('T')[0]}  // Set the minimum date to today
            required
          />
          <label>Date</label>
        </div>
        <div className="center">
          <button type="submit" className="form-submit-btn">
            Get available times
          </button>
        </div>
      </form>
      <ul>
        {avialableTimes &&
          avialableTimes.map((time) => (
            <li key={time}>
              <span style={{ color: 'black' }}>{time}</span>
              <button onClick={() => onChooseTime(time)}>
                Choose time
              </button>
            </li>
          ))}
      </ul>
      {appointment.time && (
        <div>
          <label>Selected date and time:</label>
          <span>{appointment.date} / {appointment.time}</span>
          <button onClick={onNewAppointmentTimeSelect}>
            Reserve
          </button>
        </div>
      )}
    </div>
  );
};

export default NewAppointment;
