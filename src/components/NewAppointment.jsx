import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NewAppointment = ({ selectedEquipment }) => {
  const { companyId } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ date: "" });

  const [avialableTimes, setAvialableTimes] = useState([]);

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

  const onNewAppointmentTimeSelect = async (time) => {
    console.log(time);
    console.log(formData.date);
    console.log(selectedEquipment);

    try {
      const response = await fetch("url-koji-coa-debeli-nije-napravio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          companyId,
          equipment: [...selectedEquipment],
          time,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Reservation created successfully:", data);
        navigate("coa");
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
              <button onClick={() => onNewAppointmentTimeSelect(time)}>
                Reserve
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NewAppointment;
